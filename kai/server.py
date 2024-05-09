#!/usr/bin/python3

# FIXME: This code should live in 'kai-service' but I couldn't get it to import
# the required `kai` modules. Someone smarter than me may be able to fix this.
# For now, I just copied this code wholesale. - jsussman

"""This module is intended to facilitate using Konveyor with LLMs."""

import argparse
import itertools
import json
import os
import pprint
import time
import tomllib
import traceback
import warnings
from os import listdir
from os.path import isfile, join
from typing import Any

import aiohttp
import jsonschema
import vcr
import yaml
from aiohttp import web
from aiohttp.web_request import Request
from pydantic import BaseModel, root_validator
from pydantic.v1.utils import deep_update

from kai import llm_io_handler
from kai.capture import Capture
from kai.incident_store import (
    Application,
    EmbeddingNone,
    IncidentStore,
    PSQLIncidentStore,
)
from kai.kai_logging import KAI_LOG
from kai.model_provider import ModelProvider
from kai.models import KaiConfig, KaiConfigIncidentStoreProvider
from kai.prompt_builder import build_prompt
from kai.pydantic_models import guess_language, parse_file_solution_content
from kai.report import Report

# TODO: Make openapi spec for everything

# TODO: Repo lives both on client and on server. Determine either A) Best way to
# rectify differences or B) Only have the code on one and pass stuff between
# each other
# - can be solved by getting last common commits and then applying a git diff in
#   the same manner as `git stash apply`


routes = web.RouteTableDef()

JSONSCHEMA_DIR = os.path.join(
    os.path.dirname(__file__),
    "data/jsonschema/",
)


@routes.post("/dummy_json_request")
async def post_dummy_json_request(request: Request):
    KAI_LOG.debug(f"post_dummy_json_request recv'd: {request}")

    request_json: dict = await request.json()

    return web.json_response({"feeling": "OK!", "recv": request_json})


@routes.post("/load_analysis_report")
async def post_load_analysis_report(request: Request):
    schema: dict = json.loads(
        open(os.path.join(JSONSCHEMA_DIR, "post_load_analysis_report.json")).read()
    )
    request_json: dict = await request.json()

    try:
        jsonschema.validate(instance=request_json, schema=schema)
    except jsonschema.ValidationError as err:
        raise web.HTTPUnprocessableEntity(text=f"{err}") from err

    request_json["application"].setdefault("application_id")

    application = Application(**request_json["application"])
    path_to_report: str = request_json["path_to_report"]
    report = Report(path_to_report)

    count = request.app["incident_store"].insert_and_update_from_report(
        application, report
    )

    return web.json_response(
        {
            "number_new_incidents": count[0],
            "number_unsolved_incidents": count[1],
            "number_solved_incidents": count[2],
        }
    )


@routes.post("/change_model")
async def post_change_model(request: Request):
    pass


def get_incident_solution(request_app, request_json: dict, stream: bool = False):
    start = time.time()
    capture = Capture()
    capture.request = request_json
    capture.model_id = request_app["model_provider"].get_current_model_id()

    application_name: str = request_json["application_name"]
    application_name = application_name  # NOTE: To please trunk error, remove me
    ruleset_name: str = request_json["ruleset_name"]
    violation_name: str = request_json["violation_name"]
    # FIXME: See my comment here
    # https://github.com/konveyor-ecosystem/kai/issues/87#issuecomment-2015574994
    incident_snip: str = request_json.get("incident_snip", "")
    incident_vars: dict = request_json["incident_variables"]
    file_name: str = request_json["file_name"]
    file_contents: str = request_json["file_contents"]
    line_number: int = request_json["line_number"]
    analysis_message: str = request_json.get("analysis_message", "")

    KAI_LOG.info(
        f"START - App: '{application_name}', File: '{file_name}' '{ruleset_name}'/'{violation_name}' @ Line Number '{line_number}' using model_id '{capture.model_id}'"
    )

    # Gather context
    # First, let's see if there's an "exact" match

    solved_incident, match_type = request_app[
        "incident_store"
    ].get_fuzzy_similar_incident(
        violation_name, ruleset_name, incident_snip, incident_vars
    )
    capture.solved_incident = solved_incident

    if not isinstance(solved_incident, dict):
        raise Exception("solved_example not a dict")

    pb_vars = {
        "src_file_name": file_name,
        "src_file_contents": file_contents,
        "analysis_line_number": str(line_number),
        "analysis_message": analysis_message,
    }

    KAI_LOG.debug(solved_incident)

    if bool(solved_incident) and match_type == "exact":
        solved_example = request_app["incident_store"].select_accepted_solution(
            solved_incident["solution_id"]
        )
        pb_vars["solved_example_diff"] = solved_example["solution_small_diff"]
        pb_vars["solved_example_file_name"] = solved_incident["incident_uri"]

    prompt = build_prompt(
        request_app["model_provider"].get_prompt_builder_config("single_file"), pb_vars
    )
    capture.prompt = prompt

    if stream:
        capture.llm_result = (
            "TODO consider if we need to implement for streaming responses"
        )
        capture.commit()
        end = time.time()
        KAI_LOG.info(
            f"END - completed in '{end-start}s: - App: '{application_name}', File: '{file_name}' '{ruleset_name}'/'{violation_name}' @ Line Number '{line_number}' using model_id '{capture.model_id}'"
        )
        return request_app["model_provider"].stream(prompt)
    else:
        llm_result = request_app["model_provider"].invoke(prompt)
        capture.llm_result = request_app["model_provider"].invoke(prompt)
        capture.commit()
        end = time.time()
        KAI_LOG.info(
            f"END - completed in '{end-start}s: - App: '{application_name}', File: '{file_name}' '{ruleset_name}'/'{violation_name}' @ Line Number '{line_number}' using model_id '{capture.model_id}'"
        )
        return llm_result


# TODO: Figure out why we have to put this validator wrapping the routes
# decorator
def validator(schema_file):
    def decorator(fn):
        async def inner(request: Request, *args, **kwargs):
            request_json = await request.json()

            schema: dict = json.loads(
                open(os.path.join(JSONSCHEMA_DIR, schema_file)).read()
            )

            try:
                jsonschema.validate(instance=request_json, schema=schema)
            except jsonschema.ValidationError as err:
                KAI_LOG.error(f"{err}")
                raise web.HTTPUnprocessableEntity(text=f"{err}") from err

            return fn(request, *args, **kwargs)

        return inner

    return decorator


@validator("post_get_incident_solution.json")
@routes.post("/get_incident_solution")
async def post_get_incident_solution(request: Request):
    """
    Will need to cache the incident result so that the user, when it accepts
    or rejects it knows what the heck the user is referencing

    Stateful, stores it

    params (json):
    - application_name (str)
    - ruleset_name (str)
    - violation_name (str)
    - incident_snip (str optional)
    - incident_variables (object)
    - file_name (str)
    - file_contents (str)
    - line_number: 0-indexed (let's keep it consistent)
    - analysis_message (str)

    return (json):
    - llm_output:
    """

    KAI_LOG.debug(f"post_get_incident_solution recv'd: {request}")

    llm_output = get_incident_solution(request.app, await request.json(), False).content

    return web.json_response(
        {
            "llm_output": llm_output,
        }
    )


@validator("post_get_incident_solution.json")
@routes.get("/ws/get_incident_solution")
async def ws_get_incident_solution(request: Request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    msg = await ws.receive()

    if msg.type == web.WSMsgType.TEXT:
        try:
            json_request = json.loads(msg.data)

            for chunk in get_incident_solution(request.app, json_request, True):
                await ws.send_str(
                    json.dumps(
                        {
                            "content": chunk.content,
                        }
                    )
                )

        except json.JSONDecodeError:
            await ws.send_str(json.dumps({"error": "Received non-json data"}))

    elif msg.type == web.WSMsgType.ERROR:
        await ws.send_str(
            json.dumps({"error": f"Websocket closed with exception {ws.exception()}"})
        )
    else:
        await ws.send_str(json.dumps({"error": "Unsupported message type"}))

    await ws.close()

    return ws


@validator("get_incident_solutions_for_file.json")
@routes.post("/get_incident_solutions_for_file")
async def get_incident_solutions_for_file(request: Request):
    """
    - file_name (str)
    - file_contents (str)
    - application_name (str)
    - batch_mode (str optional, one of 'sequential', 'none', 'violation', 'violation_and_variables')
    - include_solved_incident (bool optional)
    - incidents (list)
        - ruleset_name (str)
        - violation_name (str)
        - incident_snip (str optional)
        - incident_variables (object)
        - line_number: 0-indexed (let's keep it consistent)
        - analysis_message (str)
    - include_llm_results (bool)
    """
    start = time.time()
    KAI_LOG.debug(f"get_incident_solutions_for_file recv'd: {request}")
    request_json = await request.json()

    KAI_LOG.info(
        f"START - App: '{request_json['application_name']}', File: '{request_json['file_name']}' with {len(request_json['incidents'])} incidents'"
    )

    result = llm_io_handler.get_incident_solutions_for_file(
        request.app["model_provider"],
        request.app["incident_store"],
        request_json.get("file_contents"),
        request_json.get("file_name"),
        request_json["application_name"],
        request_json["incidents"],
        batch_mode=request_json.get("batch_mode", "single_group"),
        include_solved_incidents=request_json.get("include_solved_incidents", True),
        include_llm_results=request_json.get("include_llm_results", False),
    )

    end = time.time()
    KAI_LOG.info(
        f"END - completed in '{end-start}s:  - App: '{request_json['application_name']}', File: '{request_json['file_name']}' with {len(request_json['incidents'])} incidents'"
    )

    return web.json_response(result)


def app(config: KaiConfig):
    webapp = web.Application()
    base_path = os.path.dirname(__file__)
    KAI_LOG.setLevel(config.log_level.upper())

    print(
        f"Logging for KAI has been initialized and the level set to {config.kai.loglevel.upper()}"
    )

    if config.demo_mode:
        KAI_LOG.info("DEMO_MODE is enabled. LLM responses will be cached")

    webapp["incident_store"] = IncidentStore.from_config(config.incident_store)

    ModelProviderClass = ModelProvider.model_from_string(config["models"]["provider"])
    webapp["model_provider"] = ModelProviderClass(**config["models"]["args"])

    KAI_LOG.info(f"Selected model {config['models']['provider']}")
    webapp.add_routes(routes)

    return webapp


def main():
    arg_parser = argparse.ArgumentParser()

    arg_parser.add_argument(
        "-log",
        "--loglevel",
        default=os.getenv("KAI_LOG_LEVEL", "info"),
        choices=["debug", "info", "warning", "error", "critical"],
        help="""Provide logging level.
Options:
- debug: Detailed information, typically of interest only when diagnosing problems.
- info: Confirmation that things are working as expected.
- warning: An indication that something unexpected happened, or indicative of some problem in the near future (e.g., ‘disk space low’). The software is still working as expected.
- error: Due to a more serious problem, the software has not been able to perform some function.
- critical: A serious error, indicating that the program itself may be unable to continue running.
Example: --loglevel debug (default: warning)""",
    )

    arg_parser.add_argument(
        "-demo",
        "--demo_mode",
        default=(os.getenv("DEMO_MODE").lower() == "true"),
        action=argparse.BooleanOptionalAction,
    )

    args, _ = arg_parser.parse_known_args()

    with open(os.path.join(os.path.dirname(__file__), "config.yaml"), "r") as f:
        config_dict: dict = yaml.safe_load(f)

    config_dict["kai"] = deep_update(config_dict["kai"], vars(args))

    config = KaiConfig.model_validate(config_dict)

    print(f"Config loaded: {pprint.pformat(config)}")

    web.run_app(app(config))


if __name__ == "__main__":
    main()

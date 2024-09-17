# Create a new git commit after each command

import argparse
import dataclasses
import datetime
import logging
import os
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional

from playpen.repo_level_awareness.command_result import CommandResult

log = logging.getLogger(__name__)
log.setLevel(logging.INFO)
formatter = logging.Formatter("[%(levelname)s] %(message)s")
handler = logging.StreamHandler()
handler.setFormatter(formatter)
log.addHandler(handler)


@dataclass
class EnvironmentSnapshot:
    project_root: Path
    max_window_size: int
    detailed_docs: bool
    commands: dict[str, Any]  # TODO: Add type

    cwd: Path
    done: bool

    opened_file: Optional[Path]
    cursor_start: Optional[int]
    cursor_end: Optional[int]

    kai_dir: Path
    git_dir: Path
    git_sha: str

    parent: Optional["EnvironmentSnapshot"] = None
    spawning_result: Optional[CommandResult] = None

    @staticmethod
    def create(
        project_root: Path,
        available_commands: list,
        *,
        max_window_size: int = 100,
        detailed_docs: bool = False,
    ) -> "EnvironmentSnapshot":
        project_root = project_root.resolve()
        kai_dir = project_root / ".kai"
        kai_dir.mkdir(exist_ok=True)
        git_dir = (
            project_root
            / ".kai"
            / f".git-kai-run-{datetime.datetime.now(datetime.timezone.utc).isoformat()}"
        )
        commands = {command.name: command for command in available_commands}

        snapshot = EnvironmentSnapshot(
            project_root=project_root,
            max_window_size=max_window_size,
            detailed_docs=detailed_docs,
            commands=commands,
            cwd=project_root,
            done=False,
            opened_file=None,
            cursor_start=None,
            cursor_end=None,
            kai_dir=kai_dir,
            git_dir=git_dir,
            git_sha="",
        )

        result = snapshot.git_init()
        if result.returncode != 0:
            raise Exception(f"Failed to initialize git repository: {result.stderr}")

        snapshot.git_sha = snapshot.git_commit("Initial commit")

        return snapshot

    def copy(self) -> "EnvironmentSnapshot":
        return dataclasses.replace(self)

    def shell_prompt(self):
        if self.opened_file is None:
            return f"(Open file: None)\n[{self.cwd.relative_to(self.project_root)}] $ "

        return (
            f"Open file: {self.opened_file.relative_to(self.project_root)}:(start_cursor: {self.cursor_start}, end_cursor: {self.cursor_end})\n"
            f"[{self.cwd.relative_to(self.project_root)}] $ "
        )

    def print_docs(self):
        result = ""
        for command in self.commands.values():
            result += f"{command.signature}\n\t{command.docstring}\n"
            if self.detailed_docs:
                for arg in command.arguments:
                    result += f"\t{arg.name}: {arg.docstring}\n"

        return result

    def cmd_popen(self, cmd: list[str], **kwargs) -> "CommandResult":
        log.debug(f"\033[94mRunning cmd:\033[0m {cmd}")
        popen_kwargs = {
            "cwd": self.cwd,
            "env": dict(os.environ),
            "stdout": subprocess.PIPE,
            "stderr": subprocess.PIPE,
            "text": True,
            **kwargs,
        }

        proc = subprocess.Popen(cmd, **popen_kwargs)

        stdout, stderr = proc.communicate()

        log.debug(f"\033[94mreturncode:\033[0m {proc.returncode}")
        log.debug(f"\033[94mstdout:\033[0m {stdout}")
        log.debug(f"\033[94mstderr:\033[0m {stderr}")

        return CommandResult(
            cmd=cmd,
            returncode=proc.returncode,
            stdout=stdout,
            stderr=stderr,
        )

    def git_init(self):
        GIT = f"git --git-dir {self.git_dir} --work-tree {self.project_root}".split()

        result = self.cmd_popen([*GIT, "init"], cwd=self.project_root)
        if result.returncode != 0:
            raise Exception(f"Failed to initialize git repository: {result.stderr}")

        with open(self.git_dir / "info" / "exclude", "a") as f:
            f.write(f"/{str(self.kai_dir.name)}\n")
            f.write(f"../{str(self.kai_dir.name)}\n")

        return result

    def git_commit(self, msg: str) -> str:
        GIT = f"git --git-dir {self.git_dir} --work-tree {self.project_root}".split()

        result = self.cmd_popen([*GIT, "add", "."], cwd=self.project_root)
        if result.returncode != 0:
            raise Exception(f"Failed to add files to git repository: {result.stderr}")

        result = self.cmd_popen(
            [*GIT, "commit", "--allow-empty", "-m", msg], cwd=self.project_root
        )
        if result.returncode != 0:
            raise Exception(f"Failed to create commit: {result.stderr}")

        result = self.cmd_popen([*GIT, "rev-parse", "HEAD"], cwd=self.project_root)
        if result.returncode != 0:
            raise Exception(f"Failed to get HEAD: {result.stderr}")

        return result.stdout

    def git_reset(self):
        GIT = f"git --git-dir {self.git_dir} --work-tree {self.project_root}".split()

        result = self.cmd_popen(
            [*GIT, "reset", "--hard", self.git_sha], cwd=self.project_root
        )
        if result.returncode != 0:
            raise Exception(f"Failed to reset git repository: {result.stderr}")

        return result

    def run(self, cmd: str) -> "EnvironmentSnapshot":
        if self.done:
            # return self
            raise Exception("Cannot run command on a finished environment")

        cmd_name = cmd.strip().split(None, 1)[0]

        if cmd_name in self.commands:
            snapshot = self.commands[cmd_name].run(self, cmd)
        else:
            snapshot = dataclasses.replace(
                self,
                spawning_result=CommandResult(
                    cmd=cmd,
                    returncode=1,
                    stdout="",
                    stderr=f"Command not found: {cmd_name}",
                ),
            )

        snapshot.git_sha = snapshot.git_commit(f"Ran command: {cmd}")

        return snapshot


if __name__ == "__main__":
    from playpen.repo_level_awareness.command import DEFAULT_COMMANDS

    parser = argparse.ArgumentParser()

    parser.add_argument("--cwd", type=str, help="Current working directory")
    parser.add_argument(
        "--docs", action="store_true", help="Prints the documentation for all commands."
    )

    args = parser.parse_args()

    first_env = EnvironmentSnapshot.create(Path(args.cwd), DEFAULT_COMMANDS)
    env = first_env

    if args.docs:
        print(env.print_docs())

    try:
        while not env.done:
            cmd = input(env.shell_prompt())
            env = env.run(cmd)
            print(f"\033[94mExit code: \033[0m{env.spawning_result.returncode}")
            print(f"\033[94mstdout:\n\033[0m{env.spawning_result.stdout}")
            print(f"\033[94mstderr:\n\033[0m{env.spawning_result.stderr}")
    except Exception as e:
        print(e)

    first_env.git_reset()

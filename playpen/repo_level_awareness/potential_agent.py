import logging
from abc import ABC
from pathlib import Path

from pydantic import BaseModel, ConfigDict

from kai.models.kai_config import KaiConfigModels
from kai.service.llm_interfacing.model_provider import ModelProvider
from playpen.repo_level_awareness.command import DEFAULT_COMMANDS, Command
from playpen.repo_level_awareness.environment import EnvironmentSnapshot

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
formatter = logging.Formatter("[%(levelname)s] %(message)s")
handler = logging.StreamHandler()
handler.setFormatter(formatter)
log.addHandler(handler)


class Message(BaseModel):
    model_config = ConfigDict(frozen=True)

    role: str
    content: str
    agent: str


SYSTEM_PROMPT = """SETTING: You are an autonomous programmer, and you're working directly in the command line with a special interface.

The special interface consists of a file editor that shows you {max_window_size} lines of a file at a time.
In addition to typical bash commands, you can also use the following commands to help you navigate and edit files.

COMMANDS:
{command_docs}

Please note that THE EDIT COMMAND REQUIRES PROPER INDENTATION.
If you'd like to add the line '        print(x)' you must fully write that out, with all those spaces before the code! Indentation is important and code that is not indented correctly will fail and require fixing before it can be run.

RESPONSE FORMAT:
Your shell prompt is formatted as follows:
(Open file: <path>) <cwd> $

You need to format your output using two fields; discussion and command.
Your output should always include _one_ discussion and _one_ command field EXACTLY as in the following example:
DISCUSSION
First I'll start by using ls to see what files are in the current directory. Then maybe we can look at some relevant files to see what they look like.
```
ls
```

You should only include a *SINGLE* command in the command section and then wait for a response from the shell before continuing with more discussion and commands. Everything you include in the DISCUSSION section will be saved for future reference.
If you'd like to issue two commands at once, PLEASE DO NOT DO THAT! Please instead first submit just the first command, and then after receiving a response you'll be able to issue the second command.
You're free to use any other bash commands you want (e.g. find, grep, cat, ls, cd) in addition to the special commands listed above.
However, the environment does NOT support interactive session commands (e.g. python, vim), so please do not invoke them."""

INSTANCE_PROMPT = """We're currently solving the following issue within our repository. Here's the issue text:
ISSUE:
{issue}

INSTRUCTIONS:
Now, you're going to solve this issue on your own. Your terminal session has started and you're in the repository's root directory. You can use any bash commands or the special interface to help you. Edit all the files you need to and run any checks or tests that you want.
Remember, YOU CAN ONLY ENTER ONE COMMAND AT A TIME. You should always wait for feedback after every command.
When you're satisfied with all of the changes you've made, you can submit your changes to the code base by simply running the submit command.
Note however that you cannot use any interactive session commands (e.g. python, vim) in this environment, but you can write scripts and run them. E.g. you can write a python script and then run it with `python <script_name>.py`.

NOTE ABOUT THE EDIT COMMAND: Indentation really matters! When editing a file, make sure to insert appropriate indentation before each line!

IMPORTANT TIPS:
1. Always start by trying to replicate the bug that the issues discusses.
    If the issue includes code for reproducing the bug, we recommend that you re-implement that in your environment, and run it to make sure you can reproduce the bug.
    Then start trying to fix it.
    When you think you've fixed the bug, re-run the bug reproduction script to make sure that the bug has indeed been fixed.

    If the bug reproduction script does not print anything when it successfully runs, we recommend adding a print("Script completed successfully, no errors.") command at the end of the file,
    so that you can be sure that the script indeed ran fine all the way through.

2. If you run a command and it doesn't work, try running a different command. A command that did not work once will not work the second time unless you modify it!

3. If you open a file and need to get to an area around a specific line that is not in the first 100 lines, say line 583, don't just use the scroll_down command multiple times. Instead, use the goto 583 command. It's much quicker.

4. If the bug reproduction script requires inputting/reading a specific file, such as buggy-input.png, and you'd like to understand how to input that file, conduct a search in the existing repo code, to see whether someone else has already done that. Do this by running the command: find_file "buggy-input.png" If that doesn't work, use the linux 'find' command.

5. Always make sure to look at the currently open file and the current working directory (which appears right after the currently open file). The currently open file might be in a different directory than the working directory! Note that some commands, such as 'create', open files, so they might change the current  open file.

6. When editing files, it is easy to accidentally specify a wrong line number or to write code with incorrect indentation. Always check the code after you issue an edit to make sure that it reflects what you wanted to accomplish. If it didn't, issue another command to fix it.
"""


class HistoryProcessor(ABC):
    def process(self, messages: list[Message]) -> list[Message]:
        raise NotImplementedError


class Last10MessagesProcessor(HistoryProcessor):
    def process(self, messages: list[Message]) -> list[Message]:
        system_msgs = [msg for msg in messages if msg.role == "system"]
        last_10_msgs = messages[-10:]

        return system_msgs + [msg for msg in last_10_msgs if msg not in system_msgs]


class Agent:
    def __init__(
        self,
        project_root: Path,
        commands: list[Command],
        model_provider: ModelProvider,
        history_processor: HistoryProcessor,
        issue: str,  # FIXME
    ):
        env = EnvironmentSnapshot.create(project_root, commands)

        self.current_env = env
        self.env_history = [env]

        self.history_processor = history_processor

        self.msg_history: list[Message] = [
            Message(
                role="system",
                content=SYSTEM_PROMPT.format(
                    max_window_size=env.max_window_size,
                    command_docs=env.print_docs(),
                ),
                agent="kai",
            ),
            Message(
                role="system",
                content=INSTANCE_PROMPT.format(
                    issue=issue,
                ),
                agent="kai",
            ),
        ]

        self.model_provider = model_provider

    def run(self):
        while not self.current_env.done:
            self.msg_history.append(
                Message(
                    role="system", content=self.current_env.shell_prompt(), agent="kai"
                )
            )

            msgs = self.history_processor.process(self.msg_history)
            prompt = "\n".join([msg.content for msg in msgs])

            log.debug(f"Prompt: {prompt}")

            response = self.model_provider.llm.invoke(prompt)

            # self.msg_history.append(Message(role="agent", content=response.content, agent="kai"))

            log.debug(f"Response: {response.content}")

            command_to_execute = input("What command to execute? ")
            current_env = self.current_env.run(command_to_execute)

            self.env_history.append(current_env)

            new_content = (
                current_env.spawning_result.stdout + current_env.spawning_result.stderr
            )

            self.msg_history.append(
                Message(role="system", content=new_content, agent="kai")
            )


ISSUE = """The following project must be migrated from Java EE to Quarkus. The following issues have been identified:

FILE PATH: /pom.xml
INCIDENT TO FIX: javax javaee-api artifactId has been replaced by jakarta.platform jakarta.jakartaee-api
LINE NUMBER: 26
"""

"""There has also been a suggestion for a solution for a similar incident:

SOLUTION:

"""

ISSUE_B = """The following project must be migrated from Java EE to Quarkus.

"""

if __name__ == "__main__":
    this_file_path = Path(__file__).resolve()
    project_root = Path(
        this_file_path, "..", "..", "..", "example", "coolstore"
    ).resolve()

    # print(project_root)
    # exit()

    agent = Agent(
        project_root=project_root,
        commands=DEFAULT_COMMANDS,
        model_provider=ModelProvider(
            KaiConfigModels(
                provider="ChatOpenAI",
                args={
                    "model": "gpt-4",
                    # "temperature": 0.1,
                    # "streaming": True,
                },
            )
        ),
        history_processor=Last10MessagesProcessor(),
        issue=ISSUE_B,
    )

    agent.run()

import dataclasses
import logging
import math
import os
from abc import ABCMeta, abstractmethod
from dataclasses import dataclass
from functools import cache, cached_property
from pathlib import Path

from playpen.repo_level_awareness.command_result import CommandResult
from playpen.repo_level_awareness.environment import EnvironmentSnapshot

log = logging.getLogger(__name__)
log.setLevel(logging.INFO)
formatter = logging.Formatter("[%(levelname)s] %(message)s")
handler = logging.StreamHandler()
handler.setFormatter(formatter)
log.addHandler(handler)


@dataclass(frozen=True)
class CommandArgument:
    name: str
    type: type
    docstring: str
    required: bool = True


class CommandMeta(type):
    def __new__(cls, name, bases, dct):
        required_cls_attributes = {
            "name": str,
            "docstring": str,
            "arguments": list[CommandArgument],
        }

        for attr_name, attr_type in required_cls_attributes.items():
            if attr_name not in dct:
                raise ValueError(
                    f"Command class {name} must have a {attr_name} attribute"
                )

        return super().__new__(cls, name, bases, dct)

    def __call__(self, *args, **kwargs):
        instance = super().__call__(*args, **kwargs)

        required_cls_attributes = {
            "name": str,
            "docstring": str,
            "arguments": list,
        }

        for attr_name, attr_type in required_cls_attributes.items():
            if not getattr(instance, attr_name):
                raise ValueError(
                    f"Command class {instance.__class__.__name__} must have a {attr_name} attribute"
                )

            if not isinstance(getattr(instance, attr_name), attr_type):
                raise ValueError(
                    f"Command class {instance.__class__.__name__} must have a {attr_name} attribute of type {attr_type}"
                )

        return instance


class Command(metaclass=CommandMeta):
    name: str = None
    docstring: str = None
    arguments: list[CommandArgument] = None

    @abstractmethod
    def run(self, env: "EnvironmentSnapshot", cmd: str) -> "EnvironmentSnapshot":
        pass

    @cached_property
    def signature(self) -> str:
        result = f"{self.name}"
        for arg in self.arguments:
            if arg.required:
                result += f" <{arg.name}>"
            else:
                result += f" [<{arg.name}>]"
        return result


# --- Posix-like commands ---


class CommandLs(Command):
    name = "ls"
    docstring = "List files in the directory. If no directory is specified, list files in the current directory."
    arguments = [
        CommandArgument(
            "directory", str, "The directory to list files from", required=False
        )
    ]

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        args = cmd.split()[1:]

        log.debug(f"Running command {self.name} with args {args}")

        if len(args) > 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"Too many arguments for command {self.name}.",
                ),
            )

        path = env.cwd if len(args) == 0 else (env.project_root / args[0]).resolve()
        if not path.is_relative_to(env.project_root):
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not in the project.",
                ),
            )
        if not path.is_dir():
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not a directory.",
                ),
            )

        files = path.iterdir()
        output = ""
        for file in files:
            if file in (env.git_dir,):
                continue

            file_name = file.name
            if file.is_dir():
                file_name += "/"
            elif file.is_symlink():
                file_name += "@"
            elif file.is_fifo():
                file_name += "|"
            elif file.is_socket():
                file_name += "="
            elif file.is_file() and os.access(file, os.X_OK):
                file_name += "*"

            output += file_name + "\n"

        return dataclasses.replace(
            env,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout=output,
                stderr="",
            ),
        )


class CommandCd(Command):
    name = "cd"
    docstring = "Change the current working directory."
    arguments = [
        CommandArgument("directory", str, "The directory to change to", required=True)
    ]

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        args = cmd.split()[1:]

        log.debug(f"Running command {self.name} with args {args}")

        if len(args) != 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"Invalid number of arguments for command {self.name}.",
                ),
            )

        path = (env.project_root / args[0]).resolve()
        if not path.is_relative_to(env.project_root):
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not in the project.",
                ),
            )
        if not path.is_dir():
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not a directory.",
                ),
            )

        return dataclasses.replace(
            env,
            cwd=path,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout="",
                stderr="",
            ),
        )


class CommandMkdir(Command):
    name = "mkdir"
    docstring = "Create a directory. (Note, the -p flag is automatically enabled)"
    arguments = [
        CommandArgument("directory", str, "The directory to create", required=True)
    ]

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        args = cmd.split()[1:]

        log.debug(f"\033[94mRunning Command: \033[0m{self.name} {args}")

        if len(args) != 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"Invalid number of arguments for command {self.name}.",
                ),
            )

        path = (env.project_root / args[0]).resolve()
        if not path.is_relative_to(env.project_root):
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not in the project.",
                ),
            )

        path.mkdir(parents=True, exist_ok=True)

        return dataclasses.replace(
            env,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout="",
                stderr="",
            ),
        )


POSIX_LIKE_COMMANDS: list[Command] = [
    CommandLs(),
    CommandCd(),
    CommandMkdir(),
]

# --- Agent Commands ---


def print_file_contents(env: EnvironmentSnapshot, path: Path):
    cursor_start = env.cursor_start if env.cursor_start is not None else 1
    cursor_end = env.cursor_end if env.cursor_end is not None else env.max_window_size

    # read the file, split it into lines, and get the lines between cursor_start
    # and cursor_end, modifying them if they are out of bounds, making sure to
    # prefix the lines with their line number (1-indexed, minimum number of
    # digits) and return the result as a string
    with open(path, "r") as f:
        lines = f.readlines()
        if cursor_start < 1:
            cursor_start = 1
        if cursor_end > len(lines):
            cursor_end = len(lines)
        if cursor_end - cursor_start > env.max_window_size:
            cursor_end = cursor_start + env.max_window_size

        num_digits = math.floor(math.log(len(lines), 10)) + 1
        return (
            "".join(
                f"{i+1:0{num_digits}d}: {line}"
                for i, line in enumerate(lines[cursor_start - 1 : cursor_end])
            ),
            cursor_start,
            cursor_end,
        )


# --- File Viewer Commands ---


class CommandOpen(Command):
    name = "open"
    docstring = "Opens a file."
    arguments = [CommandArgument("file", str, "The file to open", required=True)]

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        args = cmd.split()[1:]

        log.debug(f"Running command {self.name} with args {args}")

        if len(args) != 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"Invalid number of arguments for command {self.name}.",
                ),
            )

        path = (env.project_root / args[0]).resolve()
        if not path.is_relative_to(env.project_root):
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not in the project.",
                ),
            )
        if not path.is_file():
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not a file.",
                ),
            )

        output, cursor_start, cursor_end = print_file_contents(env, path)

        return dataclasses.replace(
            env,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout=output,
                stderr="",
            ),
            opened_file=path,
            cursor_start=cursor_start,
            cursor_end=cursor_end,
        )


class CommandSetCursor(Command):
    name = "set_cursor"
    docstring = "Sets the cursor position in the currently opened file."
    arguments = [
        CommandArgument("start", int, "The start cursor position", required=True),
        CommandArgument("end", int, "The end cursor position", required=True),
    ]

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        args = cmd.split()[1:]

        log.debug(f"Running command {self.name} with args {args}")

        if len(args) != 2:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"Invalid number of arguments for command {self.name}.",
                ),
            )

        if env.opened_file is None:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr="No file is currently open.",
                ),
            )

        cursor_start = int(args[0])
        cursor_end = int(args[1])

        if cursor_start < 1 or cursor_end < 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr="Cursor positions must be positive.",
                ),
            )

        output, cursor_start, cursor_end = print_file_contents(env, env.opened_file)

        return dataclasses.replace(
            env,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout=output,
                stderr="",
            ),
            cursor_start=cursor_start,
            cursor_end=cursor_end,
        )


class CommandGoto(Command):
    name = "goto"
    docstring = "Sets start_cursor to the specified line number."  # The end cursor is set to the end of the window.
    arguments = [
        CommandArgument("line", int, "The line number to go to", required=True),
    ]

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        args = cmd.split()[1:]

        log.debug(f"Running command {self.name} with args {args}")

        if len(args) != 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"Invalid number of arguments for command {self.name}.",
                ),
            )

        if env.opened_file is None:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr="No file is currently open.",
                ),
            )

        line = int(args[0])
        if line < 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr="Line number must be positive.",
                ),
            )

        result = env.copy()
        result.cursor_start = line
        result.cursor_end = line + env.max_window_size

        output, cursor_start, cursor_end = print_file_contents(result, env.opened_file)

        return dataclasses.replace(
            env,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout=output,
                stderr="",
            ),
            cursor_start=cursor_start,
            cursor_end=cursor_end,
        )


# --- Search Tools ---

# --- File Manipulation Commands ---


class CommandCreate(Command):
    name = "create"
    docstring = "Creates and opens a file."
    arguments = [CommandArgument("file", str, "The file to create", required=True)]

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        args = cmd.split()[1:]

        log.debug(f"Running command {self.name} with args {args}")

        if len(args) != 1:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"Invalid number of arguments for command {self.name}.",
                ),
            )

        path = (env.project_root / args[0]).resolve()
        if not path.is_relative_to(env.project_root):
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr=f"{path} is not in the project.",
                ),
            )

        path.parent.mkdir(parents=True, exist_ok=True)
        path.touch()

        return dataclasses.replace(
            env,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout="",
                stderr="",
            ),
            opened_file=path,
            cursor_start=1,
            cursor_end=1,
        )


class CommandEdit(Command):
    name = "edit"
    docstring = "Edits the currently opened file."
    arguments = [
        CommandArgument("start", int, "The start cursor position", required=True),
        CommandArgument("end", int, "The end cursor position", required=True),
        CommandArgument(
            "content",
            str,
            "The content to replace the selected text with",
            required=True,
        ),
    ]

    @cached_property
    def signature(self) -> str:
        return "edit <start>:<end>\n<content>\nend_of_edit"

    def run(self, env: EnvironmentSnapshot, cmd: str) -> EnvironmentSnapshot:
        # cmd will look exactly like:
        # edit <start>:<end>\n<content>\nend_of_edit
        cmd = cmd.split(" ", 1)[1]

        args = cmd.split("\n")
        start, end = map(int, args[0].split(":"))
        content = "\n".join(args[1:-1])

        if env.opened_file is None:
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr="No file is currently open.",
                ),
            )

        with open(env.opened_file, "r") as f:
            lines = f.readlines()

        if start < 1 or end > len(lines):
            return dataclasses.replace(
                env,
                spawning_result=CommandResult(
                    cmd=args,
                    returncode=1,
                    stdout="",
                    stderr="Invalid cursor positions.",
                ),
            )

        lines[start - 1 : end] = content.split("\n")

        with open(env.opened_file, "w") as f:
            f.writelines(lines)

        output, cursor_start, cursor_end = print_file_contents(env, env.opened_file)

        return dataclasses.replace(
            env,
            spawning_result=CommandResult(
                cmd=args,
                returncode=0,
                stdout=output,
                stderr="",
            ),
            cursor_start=cursor_start,
            cursor_end=cursor_end,
        )


# --- Task ---

AGENT_COMMANDS: list[Command] = [
    CommandOpen(),
    CommandSetCursor(),
    CommandGoto(),
    CommandCreate(),
    CommandEdit(),
    CommandSetCursor(),
]

DEFAULT_COMMANDS = [*POSIX_LIKE_COMMANDS, *AGENT_COMMANDS]

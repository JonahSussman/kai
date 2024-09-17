from dataclasses import dataclass


@dataclass(frozen=True)
class CommandResult:
    cmd: str
    returncode: int
    stdout: str
    stderr: str

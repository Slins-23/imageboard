from datetime import datetime
from dataclasses import dataclass
from enum import Enum
import sys
from contextvars import ContextVar
from contextlib import contextmanager
from typing import Literal

class Severity(str, Enum):
    INFO = "INFO"
    WARN = "WARN"
    ERROR = "ERROR"
    SUCCESS = "SUCCESS"

class Scope(str, Enum):
    lifecycle = "lifecycle"
    cluster = "cluster"
    networking = "networking"
    infra = "infra"
    monitoring = "monitoring"
    storage = "storage"
    apps = "apps"
    shell = "shell"
    docker = "docker"
    helm = "helm"
    kubectl = "kubectl"
    post_renderer = "post-renderer"
    deployment = "deployment"

_scope_stack: ContextVar[tuple[Scope, ...]] = ContextVar(
    "scope_stack",
    default=()
)

@contextmanager
def scoped(*scopes: Scope):
    current = _scope_stack.get()

    token = _scope_stack.set(current + scopes)

    try:
        yield
    finally:
        _scope_stack.reset(token)

@dataclass
class Config:
    debug: bool = False

cfg = Config(False)

# SCOPES = Literal["lifecycle", "cluster", "networking", "infra", "monitoring", "storage", "apps", "shell", "docker", "helm", "kubectl"]

def set_debug(value: bool) -> int:
    cfg.debug = value

    return 0

def _now() -> str:
    return datetime.now().strftime("%d/%m/%Y %H:%M:%S")

def _log(message: str, severity: Severity | None = None, debug: bool = False, *, output_stream: Literal["stdout", "stderr"] = "stdout") -> None:
    if debug and not cfg.debug:
        return

    string = "\033["

    if severity == Severity.WARN:
        # Yellow
        string += "33"
    elif severity == Severity.ERROR:
        # Red
        string += "31"
    elif severity == Severity.SUCCESS:
        # Green
        string += "32"
    else:
        # White
        string += "37"

    string += "m"

    string += f"[{_now()}]"

    scopes = _scope_stack.get()

    if severity or scopes != ():
        string += "["

        if severity and scopes != ():
            string += f"{severity.value}:{':'.join(scope.value for scope in scopes)}"
        elif severity:
            string += severity.value
        elif scopes != ():
            string += ':'.join(scope.value for scope in scopes)

        string += "]"

    string += f" {message}"

    string += "\033[0m"

    if severity and (severity == Severity.ERROR or severity == Severity.WARN):
        print(string, file=sys.stderr, flush=True)
    else:
        print(string, file=sys.stdout if output_stream == "stdout" else sys.stderr, flush=True)

def info(message: str, *, debug: bool = False, output_stream: Literal["stdout", "stderr"] = "stdout") -> None:
    _log(message, severity=Severity.INFO, debug=debug, output_stream=output_stream)

def warn(message: str, *, debug: bool = False, output_stream: Literal["stdout", "stderr"] = "stdout") -> None:
    _log(message, severity=Severity.WARN, debug=debug, output_stream=output_stream)
    
def error(message: str, *, debug: bool = False, output_stream: Literal["stdout", "stderr"] = "stdout") -> None:
    _log(message, severity=Severity.ERROR, debug=debug, output_stream=output_stream)
    
def success(message: str, *, debug: bool = False, output_stream: Literal["stdout", "stderr"] = "stdout") -> None:
    _log(message, severity=Severity.SUCCESS, debug=debug, output_stream=output_stream)
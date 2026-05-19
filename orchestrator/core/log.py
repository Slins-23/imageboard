from datetime import datetime
from typing import Literal
from dataclasses import dataclass

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

def _log(message: str, log_type: Literal["INFO", "WARN", "ERROR", "SUCCESS"]  | None = None, scope: str | None = None) -> None:
    string = "\033["

    if log_type == "WARN":
        # Yellow
        string += "33"
    elif log_type == "ERROR":
        # Red
        string += "31"
    elif log_type == "SUCCESS":
        # Green
        string += "32"
    else:
        # White
        string += "37"

    string += "m"

    string += f"[{_now()}]"

    if log_type and scope:
        string += f" [{log_type}:{scope}]"
    elif log_type:
        string += f" [{log_type}]"
    elif scope:
        string += f" [{scope}]"

    string += f" {message}"

    string += "\033[0m"

    print(string)


def info(message: str, scope: str | None) -> None:
    _log(message, log_type="INFO", scope=scope)

def warn(message: str, scope: str | None) -> None:
    _log(message, log_type="WARN", scope=scope)
    
def error(message: str, scope: str | None) -> None:
    _log(message, log_type="ERROR", scope=scope)
    
def success(message: str, scope: str | None) -> None:
    _log(message, log_type="SUCCESS", scope=scope)
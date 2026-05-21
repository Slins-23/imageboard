from dataclasses import dataclass
from pathlib import Path
from orchestrator.models.mount import Mount
from typing import Mapping, Any

@dataclass(frozen=True)
class Service:
    path: Path
    name: str
    enabled: bool = False
    chart: Path | None = None
    file: Path | None = None
    namespace: str = "default"
    type: str = "apps"
    mounts: list[Mount] | None = None
    migrations: Mapping[str, Any] | None = None
    dependsOn: list[str] | None = None
    wait: bool = False
    waitFor: list[Mapping[str, Any]] | None = None
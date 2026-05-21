import orchestrator.config as config
from dataclasses import dataclass
from pathlib import Path
from typing import Mapping, Any, Literal

@dataclass(frozen=True)
class Mount:
    name: str
    type: Literal["persistent", "source"]
    hostPath: Path
    containerPath: Path
    enabled: bool = False
    readOnly: bool = False
    capacity: str = config.DEFAULT_STORAGE_CAPACITY

    @classmethod
    def from_mapping(cls, mapping: Mapping[str, Any]):
        return cls(
            name=mapping["name"],
            type=mapping["type"],
            hostPath=Path(mapping["hostPath"]),
            containerPath=Path(mapping["containerPath"]),
            enabled=bool(mapping.get("enabled", False)),
            readOnly=bool(mapping.get("readOnly", False)),
            capacity=mapping.get("capacity", config.DEFAULT_STORAGE_CAPACITY)
        )
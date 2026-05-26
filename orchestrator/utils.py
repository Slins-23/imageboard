import yaml
from typing import Any
from pathlib import Path
import orchestrator.core.log as log

def read_yaml(file: Path) -> Any:
    log.info(f"Reading YAML file '{str(file)}'", debug=True)

    if not file.is_file():
        return {}

    with open(file, mode="r", encoding="utf-8") as yaml_file:
        yaml_data: Any = yaml.safe_load(yaml_file) or {}

    return yaml_data
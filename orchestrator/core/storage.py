from typing import Mapping, Any
import orchestrator.core.log as log

def get_db_settings(values: Mapping[str, Any], service_name: str) -> Mapping[str, str]:
    if log.cfg.debug:
        log.info(f"Getting database settings for service '{service_name}'", scope="storage")

    db = values.get("db", {})

    return {
        "username": db.get("username", "admin"),
        "password": db.get("password", "12345"),
        "database": db.get(
            "database",
            service_name.replace("-", "_")
        ),
    }
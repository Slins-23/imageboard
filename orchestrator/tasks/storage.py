from orchestrator.core.deployment import deploy, delete
import orchestrator.core.log as log
from orchestrator.core.log import Scope

def up() -> int:
    with log.scoped(Scope.storage):
        log.info("Deploying 'storage' services...")
        deploy("storage")

    return 0

def down() -> int:
    with log.scoped(Scope.storage):
        log.info("Removing 'storage' services...")
        delete("storage", cleanup=True)

    return 0
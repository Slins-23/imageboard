from orchestrator.core.deployment import deploy, delete
import orchestrator.core.log as log
from orchestrator.core.log import Scope

def up() -> int:
    with log.scoped(Scope.infra):
        log.info("Deploying 'infra' services...")
        deploy("infra")

    return 0

def down() -> int:
    with log.scoped(Scope.infra):
        log.info("Removing 'infra' services...")
        delete("infra", cleanup=True)

    return 0
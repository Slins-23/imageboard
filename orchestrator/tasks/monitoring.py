from orchestrator.core.deployment import deploy, delete
import orchestrator.core.log as log
from orchestrator.core.log import Scope

def up() -> int:
    with log.scoped(Scope.monitoring):
        log.info("Deploying 'monitoring' services...")
        deploy("monitoring")

    return 0

def down() -> int:
    with log.scoped(Scope.monitoring):
        log.info("Removing 'monitoring' services...")
        delete("monitoring", cleanup=True)

    return 0
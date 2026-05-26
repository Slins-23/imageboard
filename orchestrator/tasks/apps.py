from orchestrator.core.deployment import deploy, delete
import orchestrator.core.log as log
from orchestrator.core.log import Scope

def up() -> int:
    with log.scoped(Scope.apps):
        log.info("Deploying 'apps' services...")
        deploy("apps")
    
    return 0

def down() -> int:
    with log.scoped(Scope.apps):
        log.info("Removing 'apps' services...")
        delete("apps", cleanup=True)

    return 0
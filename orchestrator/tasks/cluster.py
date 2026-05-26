import orchestrator.core.cluster as cluster
import orchestrator.core.log as log
from orchestrator.core.log import Scope

def up() -> int:
    with log.scoped(Scope.cluster):
        log.info("Creating cluster...")

        cluster.create()
        cluster.create_namespaces()

    return 0

def down() -> int:
    with log.scoped(Scope.cluster):
        log.info("Removing cluster...")
        
        cluster.delete_namespaces()
        cluster.delete()

    return 0
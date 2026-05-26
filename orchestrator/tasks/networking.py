from orchestrator.core.networking import start_nginx, start_istio, stop_istio, stop_nginx
import orchestrator.core.log as log
from orchestrator.core.log import Scope

def up() -> int:
    with log.scoped(Scope.networking):
        log.info("Setting up the network...")
        start_nginx()
        start_istio()
    
    return 0

def down() -> int:
    with log.scoped(Scope.networking):
        log.info("Removing the network...")
        stop_istio()
        stop_nginx()

    return 0

def restart() -> int:
    with log.scoped(Scope.networking):
        down()
        up()

    return 0
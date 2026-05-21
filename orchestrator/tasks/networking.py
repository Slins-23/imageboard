from orchestrator.core.networking import start_nginx, start_istio, stop_istio, stop_nginx

def up() -> int:
    start_nginx()
    start_istio()
    
    return 0

def down() -> int:
    stop_istio()
    stop_nginx()

    return 0

def restart() -> int:
    down()
    up()

    return 0
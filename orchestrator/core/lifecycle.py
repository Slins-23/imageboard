import orchestrator.core.shell as shell
import orchestrator.core.deployment as deployment
import os
import orchestrator.core.log as log
import orchestrator.config as config
from orchestrator.tasks import cluster, networking, apps, infra, monitoring, storage
import random

def _handle_ports() -> int:
    socket_data = shell.run([
        "ss",
        "-tlnp"
    ])

    if socket_data.returncode != 0:
        log.error("Could not check ports.")
        return socket_data.returncode
    
    grep_nginx = shell.run([
        "grep",
        "-q",
        str(config.NGINX_PORT)
    ], 
        input=socket_data.stdout,
        allow_fail=True
    )

    if grep_nginx.returncode == 0:
        log.warn(f"Port set for NGINX '{config.NGINX_PORT}' is already in use, finding a new open port...")

        new_nginx_port = random.randint(1024, 49151)

        while shell.run([
            "grep",
            "-q",
            str(new_nginx_port)
        ],
            input=socket_data.stdout,
            allow_fail=True
        ).returncode == 0:
            new_nginx_port = random.randint(1024, 49151)

        log.warn(f"Using free port '{new_nginx_port}' instead of busy port '{config.NGINX_PORT}' for NGINX.")

        config.NGINX_PORT = new_nginx_port
        os.environ.update({"NGINX_PORT": str(new_nginx_port)})

        socket_data = shell.run([
        "ss",
        "-tlnp"
        ])

        if socket_data.returncode != 0:
            log.error("Could not check ports.")
            return socket_data.returncode


        
    grep_istio = shell.run([
        "grep",
        "-q",
        str(config.ISTIO_PORT)
    ], 
        input=socket_data.stdout,
        allow_fail=True
    )

    if grep_istio.returncode == 0:
        log.warn(f"Port set for ISTIO '{config.ISTIO_PORT}' is already in use, finding a new open port...")

        new_istio_port = random.randint(1024, 49151)

        while shell.run([
            "grep",
            "-q",
            str(new_istio_port)
        ],
            input=socket_data.stdout,
            allow_fail=True
        ).returncode == 0:
            new_istio_port = random.randint(1024, 49151)

        log.warn(f"Using free port '{new_istio_port}' instead of busy port '{config.ISTIO_PORT}' for ISTIO.")

        config.ISTIO_PORT = new_istio_port
        os.environ.update({"ISTIO_PORT": str(new_istio_port)})

        socket_data = shell.run([
            "ss",
            "-tlnp"
        ])

        if socket_data.returncode != 0:
            log.error("Could not check ports.")
            return socket_data.returncode

    return 0

def _own_directories() -> int:
    log.info("Owning project root directory...")
    
    shell.run([
        "sudo",
        "chown",
        "-R",
        f"{str(os.getuid())}:{str(os.getgid())}",
        "."
        # "backend",
        # "platform"
    ])

    return 0

def _install_npm() -> int:
    log.info("Installing root and workspaces npm packages...")

    shell.run([
        "npm",
        "install"
    ])

    return 0

def _generate_openapi() -> int:
    log.info(f"Generating OpenAPI schema from Zod schemas at '{config.CONTRACTS_DIR}'...")

    result = shell.run([
        "npm",
        "run",
        "generate",
        "--prefix",
        str(config.CONTRACTS_DIR.resolve())
    ])

    if result.returncode == 0:
        log.success(f"Successfully generated OpenAPI schema at '{config.CONTRACTS_DIR / "generated" / "openapi.json"}'.")
    else:
        log.error(f"Could not generate OpenAPI schema from Zod schemas at '{config.CONTRACTS_DIR}'")
        return 1

    return 0

def up() -> int:
    log.info("Starting...")

    log.info("Removing previous resources...")
    
    down()
    _handle_ports()
    _own_directories()
    _install_npm()
    _generate_openapi()

    deployment.initialize()
    cluster.up()
    networking.up()
    infra.up()
    storage.up()
    monitoring.up()
    apps.up()

    log.success(f"""
                    Application is up and running.

                    Request path is NGINX (Reverse proxy) -> Istio (ingress gateway/service mesh) -> Services

                    NGINX/Frontend: http://localhost:{config.NGINX_PORT}
                    Istio ingress: http://localhost:{config.ISTIO_PORT}
                    Storybook: http://storybook.localhost:{config.NGINX_PORT}
                    BFF/DAL: http://localhost:{config.NGINX_PORT}/api
                    Swagger UI: http://swagger.localhost:{config.NGINX_PORT}
                    Prometheus: http://prometheus.localhost:{config.NGINX_PORT}
                    Grafana: http://grafana.localhost:{config.NGINX_PORT}
                    Jaeger: http://jaeger.localhost:{config.NGINX_PORT}

                    """)

    return 0

def down() -> int:
    log.info("Stopping...")

    apps.down()
    monitoring.down()
    storage.down()
    infra.down()
    networking.down()
    cluster.down()

    log.success("Successfully stopped and removed everything.")

    return 0

def restart() -> int:
    log.info("Restarting...")

    down()
    up()

    log.success("Successfully restarted the application.")

    return 0
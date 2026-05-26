import orchestrator.core.shell as shell
import orchestrator.core.deployment as deployment
import os
import orchestrator.core.log as log
import orchestrator.config as config
from orchestrator.tasks import cluster, networking, apps, infra, monitoring, storage


def own_directories() -> int:
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

def install_npm() -> int:
    shell.run([
        "npm",
        "install"
    ])

    return 0

def up() -> int:
    log.info("Starting...")

    log.info("Removing previous resources...")
    down()

    log.info("Owning project root directory...")
    own_directories()

    log.info("Installing (local) npm packages...")
    install_npm()

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
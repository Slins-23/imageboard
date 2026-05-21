import orchestrator.core.shell as shell
import orchestrator.core.deployment as deployment
import orchestrator.tasks.cluster as cluster
import orchestrator.tasks.networking as networking
import os
import orchestrator.core.log as log
import orchestrator.config as config

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
    log.info("Starting...", scope="lifecycle")

    log.info("Removing previous resources...", scope="lifecycle")
    down()

    log.info("Owning project root directory...", scope="lifecycle")
    own_directories()

    log.info("Installing (local) npm packages...", scope="lifecycle")
    install_npm()

    log.info("Finding all services (deploy.yaml)...", scope="lifecycle")
    deployment.initialize()

    log.info("Creating cluster...", scope="lifecycle")
    cluster.up()

    log.info("Setting up the network..." , scope="lifecycle")
    networking.up()

    log.info("Deploying 'infra' services...", scope="lifecycle")
    deployment.deploy("infra")

    log.info("Deploying 'storage' services...", scope="lifecycle")
    deployment.deploy("storage")

    log.info("Deploying 'monitoring' services...", scope="lifecycle")
    deployment.deploy("monitoring")

    log.info("Deploying 'apps' services...", scope="lifecycle")
    deployment.deploy("apps")

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

                """, "lifecycle")

    return 0

def down() -> int:
    log.info("Stopping...", scope="lifecycle")

    log.info("Removing 'apps' services...", scope="lifecycle")
    deployment.delete(scope="apps", type_name="apps", cleanup=True)

    log.info("Removing 'monitoring' services...", scope="lifecycle")
    deployment.delete(scope="monitoring", type_name="monitoring", cleanup=True)

    log.info("Removing 'storage' services...", scope="lifecycle")
    deployment.delete(scope="storage", type_name="storage", cleanup=True)

    log.info("Removing 'infra' services...", scope="lifecycle")
    deployment.delete(scope="infra", type_name="infra", cleanup=True)

    log.info("Removing the network..." , scope="networking")
    networking.down()

    log.info("Removing cluster...", scope="cluster")
    cluster.down()

    log.success("Successfully stopped and removed everything.", scope="lifecycle")

    return 0

def restart() -> int:
    log.info("Restarting...", scope="lifecycle")

    down()
    up()

    log.success("Successfully restarted the application.", scope="lifecycle")

    return 0
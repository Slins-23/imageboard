import subprocess
from pathlib import Path
from string import Template
import orchestrator.config as config
import orchestrator.core.docker as docker
import orchestrator.core.helm as helm
import orchestrator.core.kubectl as kubectl
import orchestrator.core.shell as shell
import orchestrator.core.log as log


NGINX_DIR = config.NETWORKING_DIR / "nginx"
NGINX_NAME = "nginx"
NGINX_IMAGE = "nginx:mainline-alpine3.23-perl"
ISTIO_DIR = config.NETWORKING_DIR / "istio"

ISTIO_PF: subprocess.Popen[str] | None = None

def _render_nginx_conf() -> None:
    template_path = NGINX_DIR / "default.template.conf"
    output_path = NGINX_DIR / "default.conf"

    log.info(f"Rendering NGINX configuration to '{output_path}' from template at '{template_path}'...")
    
    template = Template(template_path.read_text(encoding="utf-8"))

    output = template.safe_substitute(
        NGINX_PROXY_PORT=str(config.NGINX_PORT),
        ISTIO_INGRESS_PORT=str(config.ISTIO_PORT),
    )

    output_path.write_text(output, encoding="utf-8")

def start_nginx() -> int:
    log.info("Starting NGINX...")

    _render_nginx_conf()

    log.info(f"Pulling NGINX docker image '{NGINX_IMAGE}'...", debug=True)

    shell.run([
        "docker",
        "pull",
        NGINX_IMAGE
    ])

    log.info("Attempting to remove NGINX container as it could be already running...", debug=True)
    
    docker.rm(NGINX_NAME)

    docker.run(NGINX_NAME, NGINX_IMAGE, mounts={
        NGINX_DIR / "default.conf": Path("/etc/nginx/conf.d/default.conf"),
        NGINX_DIR / "proxy_params": Path("/etc/nginx/proxy_params")
    })

    log.success("Successfully started NGINX.")

    return 0

def stop_nginx() -> int:
    log.info("Stopping NGINX...")

    docker.rm(NGINX_NAME)

    log.success("Stopped NGINX.")

    return 0

def start_istio() -> int:
    log.info("Starting Istio...")

    global ISTIO_PF
    
    namespaces = [
        config.DEFAULT_NAMESPACE,
        "databases",
        "messaging",
        "registry",
        "messaging",
        "apps"
    ]

    log.info(f"Namespaces with enabled Istio injection: {", ".join(namespaces)}", debug=True)

    for namespace in namespaces:

        log.info(f"Injecting label 'istio-injection=enabled' on namespace '{namespace}'", debug=True)

        kubectl.run(
            "label",
            "namespace",
            namespace,
            "istio-injection=enabled",
            "--overwrite"
        )

    log.info("Installing Istio dependency services...", debug=True)

    releases = [
        ("istio-base", ISTIO_DIR / "istio-base" / "chart", False),
        ("istiod", ISTIO_DIR / "istiod" / "chart", False),
        ("istio-ingress", ISTIO_DIR / "istio-gateway" / "chart", True),
        ("istio-ingress-cfg", ISTIO_DIR / "istio-ingress-cfg" / "chart", True)
    ]

    for release, chart, wait in releases:
        helm.install(name=release, chart=chart, namespace="istio-system", wait=wait)

    

    ingress_log_dir = ISTIO_DIR / "istio-gateway" / "logs"
    ingress_log_dir.mkdir(parents=True, exist_ok=True)
    ingress_log_file = (ingress_log_dir / "pf.log").open("w", encoding="utf-8")

    log.info(f"Istio ingress gateway port-forward logs file: {str(ingress_log_file)}", debug=True)
    log.info(f"Port-forwarding Istio ingress gateway from service 'istio-ingress:80' in namespace 'istio-system' to localhost on port {config.ISTIO_PORT}")

    ISTIO_PF = subprocess.Popen( # pyright: ignore[reportConstantRedefinition]
        [
            "kubectl",
            "port-forward",
            "svc/istio-ingress",
            "-n",
            "istio-system",
            f"{config.ISTIO_PORT}:80"
        ],
        cwd=config.ROOT_DIR,
        stdout=ingress_log_file,
        stderr=subprocess.STDOUT,
        text=True
    )

    if ISTIO_PF.returncode == 0:
        log.success("Successfully started Istio.")
        return 0
    else:
        # log.error(f"Could not start Istio.\nError: {ISTIO_PF.stderr}")
        # return 1
        return 0

def stop_istio() -> int:
    log.info("Stopping Istio...")

    global ISTIO_PF


    log.info("Stopping port-forward...", debug=True)

    if ISTIO_PF is not None and ISTIO_PF.poll() is None:
        ISTIO_PF.terminate()
        ISTIO_PF = None # pyright: ignore[reportConstantRedefinition]

    log.info("Uninstalling dependency services...", debug=True)

    for release in ["istio-ingress-cfg", "istio-ingress", "istiod", "istio-base"]:
        helm.uninstall(release, "istio-system", cleanup=True)

    log.success("Successfully stopped Istio.")

    return 0
import orchestrator.config as config
import orchestrator.core.shell as shell
from string import Template
import orchestrator.core.kubectl as kubectl
import orchestrator.core.log as log

KIND_TEMPLATE = config.KIND_DIR / "cluster-cfg.template.yaml"
KIND_OUTPUT = config.KIND_DIR / "cluster-cfg.yaml"

NAMESPACES = [
    "cert-manager",
    "istio-system",
    "registry",
    "monitoring",
    "messaging",
    "databases",
    "apps"
]

def write_template() -> str:
    log.info(f"Writing kind configuration at '{KIND_OUTPUT}' from template '{KIND_TEMPLATE}'", scope="cluster")

    with open(KIND_TEMPLATE) as template_file:
        template = Template(template_file.read())
    
    output_cfg = template.safe_substitute(ROOT_DIR=str(config.ROOT_DIR.resolve()))

    KIND_OUTPUT.write_text(output_cfg)

    return output_cfg
    

def create():
    log.info(f"Creating kind cluster '{config.CLUSTER_NAME}'", scope="cluster")

    shell.run([
        "kind",
        "create",
        "cluster",
        "--config",
        str(KIND_OUTPUT),
         "--name",
        config.CLUSTER_NAME
         ])

    return 0

def delete():
    log.info(f"Deleting kind cluster '{config.CLUSTER_NAME}'", scope="cluster")

    shell.run([
        "kind",
        "delete",
        "cluster",
        "--name",
        config.CLUSTER_NAME,
    ], allow_fail=True)

    return 0

def create_namespaces() -> int:
    log.info("Creating cluster namespaces...", scope="cluster")
    for namespace in NAMESPACES:
        if log.cfg.debug:
            log.info(f"Creating namespace '{namespace}'", scope="cluster")

        kubectl.run(
            "create", "namespace", namespace
            )

    return 0

def delete_namespaces():
    log.info("Deleting cluster namespaces...", scope="cluster")
    for namespace in NAMESPACES:
        if log.cfg.debug:
            log.info(f"Deleting namespace '{namespace}'", scope="cluster")

        kubectl.run(
            "delete", "namespace", namespace, allow_fail=True
        )

    return 0
import orchestrator.config as config
from orchestrator.models.service import Service
from orchestrator.models.mount import Mount
import orchestrator.core.helm as helm
from pathlib import Path
import orchestrator.core.shell as shell
from typing import Mapping, Any
import orchestrator.core.paths as paths
import orchestrator.utils as utils
from string import Template
import orchestrator.core.storage as storage
import json
import orchestrator.core.kubectl as kubectl
import orchestrator.core.log as log

ALL_SERVICES: dict[str, Service] = {}

def render_template(name: str, **values: Any):
    if log.cfg.debug:
        log.info(f"Rendering template '{name}'... Values: {values}", "deployment")

    template = Template(
        (config.TEMPLATES_DIR / name).read_text(encoding="utf-8")
    )

    return template.safe_substitute({
        key: str(value)
        for key, value in values.items() 
    })

def mount_ids(service_name: str, mount_name: str) -> Mapping[str, str]:
    if log.cfg.debug:
        log.info(f"Genearting mount ids for mount '{mount_name}' in service '{service_name}'", "deployment")
    
    base = f"{service_name}-{mount_name}"

    ids = {
        "volume": base,
        "pv": f"{base}-pv",
        "pvc": f"{base}-pvc",
        "storageClass": f"{base}-data"
    }

    if log.cfg.debug:
        log.info(f"Generated ids: {ids}", "deployment")

    return ids

def get_target_database(target: str) -> tuple[Service, Mapping[str, str]]:
    log.info(f"Getting database '{target}' settings as migration target...", "deployment")

    if target not in ALL_SERVICES:
        raise ValueError(f"Migration target database service '{target}' was not found.")
    
    target_svc: Service = ALL_SERVICES[target]

    if target_svc.file is None:
        raise ValueError(f"Target service '{target}' does not have a 'values.yaml' file.")
    
    target_values = utils.read_yaml(target_svc.file, scope="deployment")

    db_config = storage.get_db_settings(target_values, target)

    log.success(f"Successfully retrieved database '{target}' info.", "deployment")

    return target_svc, db_config

def generate_mounts_and_docs(
        *,
        service: Service,
        mounts: list[Mapping[str, Any]],
        documents: list[str],
    ) -> int:
    log.info(f"Generating mounts and documents for service {service.name}.", "deployment")

    generated_dir = config.GENERATED_DIR / service.name

    for mount in service.mounts or []:
        if not mount.enabled:
            continue

        host_path = paths.resolve_relative(
            raw=str(mount.hostPath),
            service_dir=service.path.parent,
            default_leaf="data",
            scope="deployment"
        )

        if host_path is None:
            continue

        kind_mount_path = paths.kind_path(host_path)

        ids = mount_ids(
            service.name,
            mount.name
        )

        if mount.type == "persistent":
            log.info(f"Generating persistent volume and persistent volume claim for mount '{mount.name}' in service '{service.name}'.", "deployment")

            source = {
                "persistentVolumeClaim": {
                    "claimName": ids["pvc"]
                }
            }

            pv_yaml = render_template(
                "pv.template.yaml",
                PV_NAME=ids["pv"],
                STORAGE_CAPACITY=mount.capacity,
                STORAGE_CLASS=ids["storageClass"],
                HOST_PATH=kind_mount_path
            )

            pvc_yaml = render_template(
                "pvc.template.yaml",
                PVC_NAME=ids["pvc"],
                PV_NAME=ids["pv"],
                STORAGE_REQUEST=mount.capacity,
                STORAGE_CLASS=ids["storageClass"]
            )

            pv_file = generated_dir / f"{mount.name}.pv.yaml"
            pvc_file = generated_dir / f"{mount.name}.pvc.yaml"

            pv_file.write_text(pv_yaml, encoding="utf-8")
            pvc_file.write_text(pvc_yaml, encoding="utf-8")

            documents.extend([
                str(pv_file),
                str(pvc_file)
            ])

            log.success(f"Successfully generated persistent volume and persistent volume claim for mount '{mount.name}' in service '{service.name}'.", "deployment")
        else:
            source = {
                "hostPath": {
                    "path": str(kind_mount_path)
                }
            }

        mounts.append(
            {
                "name": mount.name,
                "enabled": True,
                "type": mount.type,
                "readOnly": mount.readOnly,
                "hostPath": str(host_path),
                "kindPath": str(kind_mount_path),
                "containerPath": str(mount.containerPath),
                "volumeName": ids["volume"],
                "source": source,
                "capacity": mount.capacity
            }
        )

        log.success(f"Added mount '{mount.name}' to mounts for service '{service.name}'.", "deployment")

    migrations: Mapping[str, Any] | None = service.migrations

    if migrations and migrations.get("enabled"):
        target = migrations.get("target")

        if not target:
            raise ValueError(f"Service '{service.name}' has not migration target.")
    
        log.info(f"Generating database migration job from service '{service.name}' to database service '{target}'.", "deployment")
        
        target_service, db_settings = get_target_database(target)

        migration_path = paths.resolve_relative(
            raw=str(migrations.get("path", "./migrations")),
            service_dir=service.path.parent,
            default_leaf="migrations",
            scope="deployment"
        )

        if migration_path is None:
            raise ValueError(f"Migration path for service {service.name} could not be created.")

        kind_migration_path = paths.kind_path(migration_path)

        job_yaml = render_template(
            "migration.template.yaml",
            JOB_NAME=f"{service.name}-migrate",
            MIGRATIONS_HOST_PATH=kind_migration_path,
            DB_HOST=f"{target_service.name}.{target_service.namespace}.svc",
            DB_PORT=5432,
            DB_NAME=db_settings["database"],
            DB_USER=db_settings["username"],
            DB_PASSWORD=db_settings["password"]
        )

        job_file = generated_dir / f"{service.name}.migrate-job.yaml"
        job_file.parent.mkdir(parents=True, exist_ok=True)
        job_file.write_text(job_yaml, encoding="utf-8")

        documents.append(str(job_file))

        log.info(f"Added database migration to documents for service '{service.name}'", "deployment")

    log.info(f"Successfully generated mounts and documents for service {service.name}.", "deployment")

    return 0

def generate_service_context(service: Service) -> Mapping[str, Any]:
    log.info(f"Generating context for service '{service.name}'", "deployment")

    generated_dir = config.GENERATED_DIR / service.name
    generated_dir.mkdir(parents=True, exist_ok=True)

    if log.cfg.debug:
        log.info(f"Generated directory for service '{service.name}': {str(generated_dir)}", "deployment")

    mounts: list[Mapping[str, Any]] = []
    documents: list[str] = []
    
    generate_mounts_and_docs(service=service, mounts=mounts, documents=documents)

    context: Mapping[str, Any] = {
        "serviceName": service.name,
        "serviceType": service.type,
        "generatedDir": str(generated_dir),
        "documents": documents,
        "mounts": mounts
    }

    (generated_dir / "context.json").write_text(
        json.dumps(context, indent=2),
        encoding="utf-8"
    )

    log.success("Successfully generated context.", "deployment")

    return context

def wait_for_service(service: Service) -> int:
    wait_dependencies = service.waitFor or []

    if wait_dependencies != []:
        log.info("Waiting for service dependencies...", "deployment")
    else:
        return 0

    for item in wait_dependencies:
        wait_type = item.get("type")
        namespace = item.get("namespace", service.namespace)
        timeout = item.get("timeout", "120s")

        if log.cfg.debug:
            log.info(f"Must wait for '{wait_type}' in namespace '{namespace}'. Timeout: {timeout}", "deployment")

        if wait_type == "crd":
            kubectl.wait_crd(
                item["name"],
                timeout
            )
        elif wait_type == "deployment":
            kubectl.wait_deployment(
                item["name"],
                namespace,
                timeout
            )
        elif wait_type == "endpoint":
            kubectl.wait_endpoint(
                item["name"],
                namespace,
                timeout
            )
        elif wait_type == "webhook":
            kubectl.wait_webhook(
                item["url"],
                namespace,
                int(item.get("interval", 2)),
                int(item.get("timeout", 120))
            )

    return 0

def create_service(service_path: Path) -> Service | None:
    if log.cfg.debug:
        log.info(f"Creating Service object from service '{str(service_path)}'", "deployment")

    yaml_data = utils.read_yaml(service_path, scope="deployment")

    enabled = yaml_data.get("enabled", False)

    if not enabled:
        return None
    
    namespace = yaml_data.get("namespace", config.DEFAULT_NAMESPACE)

    type = yaml_data.get("type", "apps")

    chart_raw = yaml_data.get("chart")

    file_raw = yaml_data.get("file")
    
    mounts_raw: list[dict[str, Any]] = yaml_data.get("mounts", [])

    migrations = yaml_data.get("migrations")

    depends_on = yaml_data.get("dependsOn", [])
    wait = bool(yaml_data.get("wait", False))
    wait_for = yaml_data.get("waitFor", [])

    chart = paths.resolve_relative(raw=chart_raw, service_dir=service_path.parent, scope="deployment") if chart_raw else None
    file = paths.resolve_relative(raw=file_raw, service_dir=service_path.parent, scope="deployment")

    for raw_mount in mounts_raw:
        host_path = raw_mount.get("hostPath")

        if host_path is None:
            raise ValueError(f"Host path for mount '{raw_mount.get(raw_mount["name"])}' in service '{yaml_data["name"]}' was not given.")
        
        raw_mount["hostPath"] = paths.resolve_relative(raw=host_path, service_dir=service_path.parent, scope="deployment")

    mounts = [ Mount.from_mapping(mount) for mount in mounts_raw ] if mounts_raw else []

    service = Service(
        path=service_path,
        enabled=enabled,
        name=yaml_data["name"],
        chart=chart,
        namespace=namespace,
        type=type,
        file=file,
        mounts=mounts,
        migrations=migrations,
        dependsOn=depends_on,
        wait=wait,
        waitFor=wait_for
    )

    if log.cfg.debug:
        log.success(f"Successfully created service '{service.name}'", "deployment")

    return service
    
def discover_services(type_name: str | None = None) -> list[Service]:
    log.info("Discovering services...", "deployment")

    global ALL_SERVICES
    services: list[Service] = []

    for service_path in config.ROOT_DIR.glob(f"**/{config.SERVICE_DESCRIPTOR_NAME}"):
        if "generated" in service_path.parts or "node_modules" in service_path.parts:
            continue

        service = create_service(service_path)

        if service is None:
            if log.cfg.debug:
                log.info("Skipping service: Not enabled.", "deployment")
            continue

        ALL_SERVICES[service.name] = service

        if service.type != type_name:
            continue

        services.append(service)

    log.info(f"Discovered {len(services)} services.", "deployment")

    return services

def sort_services(services: list[Service]) -> list[Service]:
    log.info("Constructing a DFS dependency graph and sorting services...", "deployment")

    visited: set[str] = set()
    visiting: set[str] = set()

    output: list[Service] = []

    def dfs(service: Service):
        if service.name in visited:
            return

        if service.name in visiting:
            raise ValueError(
                f"Circular dependency detected for '{service.name}'."
            )

        visiting.add(service.name)

        for dependency in service.dependsOn or []:
            dependency_service = ALL_SERVICES.get(dependency)

            if dependency_service is None:
                raise ValueError(
                    f"Dependency '{dependency}' for "
                    f"service '{service.name}' was not found."
                )

            dfs(dependency_service)

        visiting.remove(service.name)
        visited.add(service.name)

        output.append(service)

    for service in services:
        dfs(service)

    return output

def initialize() -> int:
    global ALL_SERVICES
    discover_services()

    return 0

def get_ids() -> tuple[int, int]:
    if log.cfg.debug:
        log.info("Getting user and group ids...", "deployment")

    uid = int(shell.run(["id", "-u"]).stdout.strip())
    gid = int(shell.run(["id", "-g"]).stdout.strip())

    log.info(f"User ID: {uid} | Group ID: ${gid}", "deployment")

    return (uid, gid)

def fix_permissions_and_folders(service: Service) -> int:
    if log.cfg.debug:
        log.info(f"Fixing mount permissions for service '{service.name}'", "deployment")

    uid, gid = get_ids()

    if service.name == "prometheus":
        uid = gid = 65534
    elif service.name == "grafana":
        uid = gid = 472
    elif service.name == "jaeger":
        uid = gid = 10001
    elif service.type == "storage":
        uid = gid = 999

    for mount in service.mounts or []:
        if log.cfg.debug:
            log.info(f"Fixing permissions for mount '{mount.name}'", "deployment")

        if not mount.enabled:
            if log.cfg.debug:
                log.info(f"Skipping mount '{mount.name}' with host path '{mount.hostPath}' and container path '{mount.containerPath}': Not enabled", "deployment")

            continue


        if log.cfg.debug:
            log.info(f"Resolving host path for mount '{mount.name}'...", "deployment")

        host_path = paths.resolve_relative(
            raw=str(mount.hostPath),
            service_dir=service.path.parent,
            default_leaf="data",
            scope="deployment"
        )

        if host_path is None:
            if log.cfg.debug:
                log.info(f"Resolved host path from mount '{str(mount.hostPath)}' is invalid. Skipping mount.", "deployment")

            continue

        if mount.hostPath.is_dir():
            host_path.mkdir(parents=True, exist_ok=True)
        else:
            host_path.parent.mkdir(parents=True, exist_ok=True)

        if log.cfg.debug:
            log.info(f"Changing ownership: host path '{str(host_path)}' to UID '{uid}' and GID '{gid}'.", "deployment")

        shell.run([
            "sudo",
            "chown",
            "-R",
            f"{uid}:{gid}",
            str(host_path)
        ])

        if log.cfg.debug:
            log.info(f"Changing permissions: host path '{str(host_path)}' to UID '{uid}' and GID '{gid}'.", "deployment")

        shell.run([
            "sudo",
            "chmod",
            "-R",
            "777",
            str(host_path)
        ])
    
    return 0

# Type = monitoring | apps | frontend | backend | etc...
def deploy(type_name: str | None) -> int:
    if type_name:
        log.info(f"Deploying services of type '{type_name}'.", "deployment")    
    else:
        log.info("Deploying all services.", "deployment")

    services = discover_services(type_name)
    services = sort_services(services)
    
    for service in services:
        log.info(f"Deploying service '{service.name}' in namespace '{service.namespace}'.", "deployment")

        if service.chart is None:
            raise ValueError(f"Service '{service.name}' has no chart defined.")
 
        fix_permissions_and_folders(service)

        context: Mapping[str, Any] = generate_service_context(service)
        context_file = Path(context["generatedDir"]) / "context.json"

        if log.cfg.debug:
            print(f"Context file path: {str(context_file)}")

        helm.install(
            service.name,
            service.chart,
            namespace=service.namespace,
            values_file=service.file,
            wait=service.wait,
            post_renderer=Path(config.POST_RENDERER_PATH),
            post_renderer_context=context_file,
            )
        
        wait_for_service(service)

        log.success(f"Successfully deployed service '{service.name}'.", "deployment")

    if type_name:
        log.success(f"Successfully deployed services of type '{type_name}'.", "deployment")
    else:
        log.success("Successfully deployed all services.", "deployment")

    return 0

def delete(scope: str, type_name: str | None = None, *, cleanup: bool = False) -> int:
    if type_name:
        log.info(f"Deleting services of type '{type_name}'", "deployment")
    else:
        log.info("Deleting all services...", "deployment")

    for service in reversed(discover_services(type_name)):
        helm.uninstall(service.name, service.namespace, cleanup=cleanup)

    if type_name:
        log.success(f"Successfully deleted services of type '{type_name}'", "deployment")
    else:
        log.success("Successfully deleted all services.", "deployment")

    return 0
    
import orchestrator.core.shell as shell
from pathlib import Path
from typing import Literal
import orchestrator.config as config
import time
import orchestrator.core.log as log

ResourceType = Literal[
    "deployment",
    "statefulset",
    "daemonset",
    "service",
    "pod",
    "job",
    "cronjob"
]

def _validate_namespace(namespace: str) -> None:
    if log.cfg.debug:
        log.info(f"Validating namespace '{namespace}'...", "kubectl")

    if not namespace.strip():
        raise ValueError("Empty namespace.")
    
def _validate_file(file: Path) -> None:
    if log.cfg.debug:
        log.info(f"Validating file '{str(file)}'...", "kubectl")

    if not file.is_file():
        raise FileNotFoundError(f"File '{file}' not found.")
    
def _validate_port(port: int) -> None:
    if log.cfg.debug:
        log.info(f"Validating port '{port}'...", "kubectl")

    if port < 0 or port > 65535:
        raise ValueError(f"Port '{port}' is invalid. Must be in range [0, 65535].")
    
def _kubectl(*args: str, allow_fail: bool = False) -> int:

    shell.run(["kubectl", *args], allow_fail=allow_fail)

    return 0

def run(*args: str, allow_fail: bool = False) -> int:
    _kubectl(*args, allow_fail=allow_fail)

    return 0

def apply(file: Path, namespace: str = config.DEFAULT_NAMESPACE) -> int:
    if log.cfg.debug:
        log.info(f"Applying file '{str(file)}' in namespace '{namespace}'", "kubectl")

    _validate_namespace(namespace)
    _validate_file(file)

    return _kubectl("apply", "-f", str(file), "-n", namespace)

def delete(
        file: Path | None = None,
        *,
        type: ResourceType | None = None,
        resource: str | None = None,
        namespace: str = config.DEFAULT_NAMESPACE
) -> int:
    if log.cfg.debug:
        log.info(f"Deleting file '{str(file)}', type '{type}' and/or resource '{resource}' in namespace '{namespace}'...", "kubectl")

    _validate_namespace(namespace)
    
    if file:
        _validate_file(file)

        if log.cfg.debug:
            log.info(f"Deleting file '{str(file)}'.", "kubectl")

        return _kubectl(
            "delete",
            "-f",
            str(file),
            "-n",
            namespace,
            allow_fail=True
        )
    
    if not type:
        raise ValueError("'type' was not provided.")

    cmd = [
        "delete",
        type
    ]

    if resource:
        cmd.extend(resource)

    return _kubectl(*cmd, allow_fail=True)

def restart(type: ResourceType, resource: str | None = None, namespace: str = config.DEFAULT_NAMESPACE) -> int:
    if log.cfg.debug:
        log.info(f"Restarting type '{type}' and/or resource '{resource}' in namespace '{namespace}'...", "kubectl")


    _validate_namespace(namespace)

    cmd = [
        "rollout",
        "restart",
        type
    ]

    if resource:
        cmd.append(resource)

    cmd.extend([
        "-n",
        namespace
    ])

    return _kubectl(*cmd)

def pf(hostPort: int, targetPort: int, type: str, resource: ResourceType | None = None, namespace: str = config.DEFAULT_NAMESPACE) -> int:
    if log.cfg.debug:
        log.info(f"Port-forwarding type: '{type}' resource: '{resource}' host port '{hostPort} to target port '{targetPort}'  in namespace '{namespace}'...", "kubectl")

    _validate_port(hostPort)
    _validate_port(targetPort)
    _validate_namespace(namespace)
    ## VALIDATE ENUM TYPE

    cmd = [
        "port-forward",
        type
    ]

    if resource:
        cmd.append(resource)

    cmd.extend([
        f"{hostPort}:{targetPort}",
        "-n",
        namespace
    ])

    result = _kubectl(*cmd)

    if log.cfg.debug:
        if result == 0:
            log.success("Successfully port-forwarded", "kubectl")
        else:
            log.error("Could not port-forward.", "kubectl")

    return result

def wait_crd(name: str, timeout: str = "120s") -> int:
    if log.cfg.debug:
        log.info(f"Waiting for CRD (Custom Resource Definition): '{name}'. Timeout: {timeout}...", "kubectl")

    return _kubectl(
        "wait",
        "--for=condition=Established",
        f"crd/{name}",
        f"--timeout={timeout}"
    )

def wait_deployment(name: str, namespace: str = config.DEFAULT_NAMESPACE, timeout: str = "120s") -> int:
    if log.cfg.debug:
        log.info(f"Waiting for deployment '{name}' in namespace '{namespace}'. Timeout: {timeout}...", "kubectl")

    return _kubectl(
        "rollout",
        "status",
        f"deployment/{name}",
        "-n",
        namespace,
        f"--timeout={timeout}"
    )

def wait_endpoint(name: str, namespace: str = config.DEFAULT_NAMESPACE, timeout: str = "120s") -> int:
    if log.cfg.debug:
        log.info(f"Waiting for endpoint '{name}' in namespace '{namespace}'. Timeout: {timeout}...", "kubectl")

    return _kubectl(
        "wait",
        "--for=jsonpath={.subsets[0].addresses[0].ip}",
        f"endpoints/{name}",
        "-n",
        namespace,
        f"--timeout={timeout}"
    )

def wait_webhook(url: str, namespace: str = config.DEFAULT_NAMESPACE, interval: int = 2, timeout: int = 120) -> int:
    log.info(f"Waiting for webhook at '{url}' in namespace '{namespace}' to become reachable. Interval: {interval}s Timeout: {timeout}s...", "kubectl")

    elapsed = 0

    while True:
        if log.cfg.debug:
            log.info(f"Running curl against '{url}'...", "kubectl")

        result = shell.run([
            "kubectl",
            "run",
            "tmp-curl",
            "--rm",
            "-i",
            "--restart=Never",
            "--image=curlimages/curl:8.19.0",
            "-n",
            namespace,
            "--",
            "curl",
            "-sk",
            url
        ], check=False)
        
        if result.returncode == 0:
            break

        if log.cfg.debug:
            log.info(f"Sleeping for {interval}s...", "kubectl")
            
        time.sleep(interval)
        elapsed += 2

        if elapsed > timeout:
            raise ValueError(f"Webhook at '{url}' is unreachable. Timeout after '{timeout}' seconds.")
        
        

    log.success("Webhook is reachable.", "kubectl")

    return 0
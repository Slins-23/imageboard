import orchestrator.core.shell as shell
from pathlib import Path
from typing import Mapping
import orchestrator.core.log as log

def install(
        name: str,
        chart: Path,
        *,
        namespace: str = "default",
        values_file: Path | None = None,
        wait: bool = False,
        env: Mapping[str, str] | None = None,
        post_renderer: Path | None = None,
        post_renderer_context: Path | None = None
) -> int:
    log.info(f"Installing service '{name}' in namespace '{namespace}' using chart at '{str(chart)}'...", "helm")

    if log.cfg.debug:
        log.info(f"Service env: {env}", "helm")


    if namespace.strip() == "":
        raise ValueError(f"Could not install chart '{name}'. Namespace was empty.")

    cmd = [
        "helm",
        "upgrade",
        "--install",
        name,
        str(chart),
        "-n",
        namespace
    ]

    if wait:
        if log.cfg.debug:
            log.info(f"Service has wait flag set.", "helm")

        cmd.append("--wait")

    if values_file is not None:
        log.info(f"Service '{name}' includes a values manifest file at '{str(values_file)}'.", "helm")

        if not values_file.is_file():
            raise FileNotFoundError(f"Values file '{values_file}' doesn't exist.")

        cmd.extend(["-f", str(values_file)])

    env = dict(env or {})

    if post_renderer is not None:
        if log.cfg.debug:
            log.info("Service includes a post renderer.", "helm")

        #if not post_renderer.is_file():
            #raise FileNotFoundError(f"Post renderer file '{post_renderer}' doesn't exist.")
        
        cmd.extend(["--post-renderer", "post-renderer"])
        #cmd.extend(["--post-renderer-args", str(post_renderer)])

        if post_renderer_context is not None:
            env["POST_RENDERER_CONTEXT"] = str(post_renderer_context)


    result = shell.run(cmd, env=env, capture_output=True)

    if log.cfg.debug:
        log.info(f"{result.stdout}", "helm")

    log.success(f"Successfully installed service '{name}'.", "helm")
    return 0

def exists(name: str, namespace: str) -> int:

    result = shell.run([
        "helm",
        "status",
        name,
        "-n",
        namespace
    ],
        allow_fail=True,
        quiet=True
    )

    return result.returncode == 0

def uninstall(name: str, namespace: str = "default", *, cleanup: bool = False) -> int:
    log.info(f"Uninstalling service '{name}' in namespace '{namespace}'...", "helm")

    if not exists(name, namespace):
        log.warn(f"Service does not exist.", "helm")
        return 0

    cmd = [
        "helm",
        "uninstall",
        name,
        "-n",
        namespace
    ]

    shell.run(cmd, capture_output=True)

    log.success(f"Successfully uninstalled service '{name}' in namespace '{namespace}'.", "helm")
    return 0
import orchestrator.core.shell as shell
from pathlib import Path
from typing import Mapping
import orchestrator.core.log as log
from orchestrator.core.log import Scope


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
    with log.scoped(Scope.helm):
        log.info(f"Installing service '{name}' in namespace '{namespace}' using chart at '{str(chart)}'...")
        log.info(f"Service env: {env}", debug=True)

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
            log.info(f"Service has wait flag set.", debug=True)

            cmd.append("--wait")

        if values_file is not None:
            log.info(f"Service '{name}' includes a values manifest file at '{str(values_file)}'.")

            if not values_file.is_file():
                raise FileNotFoundError(f"Values file '{values_file}' doesn't exist.")

            cmd.extend(["-f", str(values_file)])

        env = dict(env or {})
        env["POST_RENDERER_DEBUG"] = "1"

        if post_renderer is not None:

            log.info("Service includes a post renderer.", debug=True)

            #if not post_renderer.is_file():
                #raise FileNotFoundError(f"Post renderer file '{post_renderer}' doesn't exist.")

            # import os

            # script_dir = post_renderer.parent.resolve()
            # env["PATH"] = f"{str(script_dir)}:{os.environ.get("PATH", "/usr/local/bin:/usr/bin:/bin")}"
            
            cmd.extend(["--post-renderer", "post-renderer"])
            # cmd.extend(["--post-renderer", str(post_renderer.resolve())])
            # cmd.extend(["--post-renderer", post_renderer.name])
            #cmd.extend(["--post-renderer-args", str(post_renderer)])

            if post_renderer_context is not None:
                env["POST_RENDERER_CONTEXT"] = str(post_renderer_context)


        result = shell.run(cmd, env=env, capture_output=False)

        log.info(f"{result.stdout}", debug=True)

        log.success(f"Successfully installed service '{name}'.")
    return 0

def _exists(name: str, namespace: str) -> int:

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
    with log.scoped(Scope.helm):
        log.info(f"Uninstalling service '{name}' in namespace '{namespace}'...")

        if not _exists(name, namespace):
            log.warn(f"Service does not exist.")
            return 0

        cmd = [
            "helm",
            "uninstall",
            name,
            "-n",
            namespace
        ]

        result = shell.run(cmd, capture_output=True)

        if result.returncode == 0:
            log.success(f"Successfully uninstalled service '{name}' in namespace '{namespace}'.")
        else:
            message = f"Could not uninstall service '{name}' in namespace '{namespace}.\n {result.stderr}'"

            if cleanup:
                log.warn(message)
            else:
                log.error(message)
                return 1

    return 0
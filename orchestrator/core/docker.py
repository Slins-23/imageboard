import orchestrator.core.shell as shell
from pathlib import Path
import orchestrator.core.log as log
from orchestrator.core.log import Scope


def run(name: str, image: str, network: str = "host", mounts: dict[Path, Path] | None = None) -> int:
    with log.scoped(Scope.docker):
        log.info(f"Running docker container '{name}' using image '{image}' and network '{network}'...")

        cmd = [
            "docker",
            "run",
            "--name",
            name,
            "--network",
            network
        ]

        if mounts is not None:
            for host_path, name_path in mounts.items():
                if log.cfg.debug:
                    log.info(f"Mount detected for name '{name}' - Host: '{host_path}' | name: '{name_path}'")

                cmd.extend([
                    "-v",
                    f"{host_path}:{name_path}"
                    ])

        cmd.extend([
            "-d",
            image
        ])

        shell.run(cmd)

    return 0

def rm(name: str) -> int:
    with log.scoped(Scope.docker):
        log.info(f"Removing docker container {name}...")

        stop_cmd = [
            "docker",
            "stop",
            name
        ]

        rm_cmd = [
            "docker",
            "rm",
            name
        ]
        
        shell.run(stop_cmd, allow_fail=True)
        shell.run(rm_cmd, allow_fail=True)

    return 0

def restart(name: str) -> int:
    with log.scoped(Scope.docker):
        log.info(f"Restarting docker container {name}...")

        cmd = [
            "docker",
            "restart",
            name
        ]

        shell.run(cmd)

    return 0

def exec(sh_command: str, type: str, resource: str | None = None, namespace: str = "default"):
    with log.scoped(Scope.docker):
        cmd = [
            "docker",
            "exec",
            type
        ]

        if resource:
            cmd.append(resource)
        
        cmd.extend([
            "-n",
            namespace,
            "--",
            sh_command
        ])

        shell.run(cmd)

    return 0

'''

def start():
    pass

def pause():
    pass

def stop():
    pass

def build():
    pass

def pull():
    pass

def push():
    pass

def kill():
    pass

def load():
    pass

def restart():
    pass

def update():
    pass

def unpause():
    pass
'''
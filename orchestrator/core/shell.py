import subprocess
from pathlib import Path
from typing import Sequence, Mapping
import orchestrator.config as config
import os
import orchestrator.core.log as log
from orchestrator.core.log import Scope


def merge_env(env: Mapping[str, str] | None) -> dict[str, str]:
    log.info(f"Merging environment variables with {env}...", debug=True)

    merged_dict: dict[str, str] = dict(os.environ)

    if env is not None:
        merged_dict.update(env)

    return merged_dict

def run(
        command: Sequence[str], 
        *,
        cwd: Path | None = None,
        env: Mapping[str, str] | None = None,
        check: bool = True,
        capture_output: bool = True,
        text: bool = True,
        allow_fail: bool = False,
        quiet: bool = False,
) -> subprocess.CompletedProcess[str]:
    with log.scoped(Scope.shell):
        command_str = " ".join(command)

        if not quiet:
            log.info(f"Running shell command: {command_str}", debug=True)

        try:
            process = subprocess.run(
                list(command),
                cwd=cwd or config.ROOT_DIR,
                env=merge_env(env),
                check=check,
                capture_output=capture_output,
                text=text
                )
            
            return process
        except subprocess.CalledProcessError as error:
            stderr = (error.stderr or "").strip()

            log.error(f"Command failed: '{command_str}'\n{stderr}", debug=True)
        
            if allow_fail:
                return subprocess.CompletedProcess(
                    args=error.args,
                    returncode=error.returncode,
                    stdout=error.stdout,
                    stderr=error.stderr
                )
            
            raise

    
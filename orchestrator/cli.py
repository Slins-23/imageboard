import typer
from orchestrator.core import lifecycle
from orchestrator.core import log
from orchestrator.core.log import Scope
import os

os.environ.update()

cli = typer.Typer()

@cli.callback()
def main(
    debug: bool = typer.Option(False, "--debug", help="Enable debug logs.") # type: ignore
):
    if debug:
        log.set_debug(True)
        # os.environ.update({
            # "POST_RENDERER_DEBUG": "1"
        # })

@cli.command()
def up():
    with log.scoped(Scope.lifecycle):
        return lifecycle.up()
    
    log.error("Scope was incorrectly ignored on CLI lifecycle up.")
    
    return 1

@cli.command()
def down():
    with log.scoped(Scope.lifecycle):
        return lifecycle.down()
    
    log.error("Scope was incorrectly ignored on CLI lifecycle down.")

    return 1

@cli.command()
def restart():
    with log.scoped(Scope.lifecycle):
        return lifecycle.restart()
    
    log.error("Scope was incorrectly ignored on CLI lifecycle restart.")

    return 1

if __name__ == "__main__":
    cli()
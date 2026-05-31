import typer
from orchestrator.core import lifecycle
from orchestrator.core import log
from orchestrator.core.log import Scope

def set_log_debug(debug: bool) -> int:
    if debug:
        log.set_debug(True)

    return 0

cli = typer.Typer(
    no_args_is_help=True
)

@cli.callback()
def main(
    context: typer.Context,
    debug: bool = typer.Option(False, "--debug", help="Enable debug logs (more verbose).") # type: ignore
):
    context.obj = { "debug": debug }
    set_log_debug(debug)

    # if debug:
        # log.set_debug(True)
        # os.environ.update({
            # "POST_RENDERER_DEBUG": "1"
        # })

@cli.command(help="Starts the application.")
def up(
    context: typer.Context,
    debug: bool = typer.Option(False, "--debug", help="Enable debug logs (more verbose).") # type: ignore
):
    set_log_debug(debug or context.obj.get("debug", False))

    with log.scoped(Scope.lifecycle):
        return lifecycle.up()
    
    log.error("Scope was incorrectly ignored on CLI lifecycle up.")
    
    return 1

@cli.command(help="Deletes the application (except persistent data).")
def down(
    context: typer.Context,
    debug: bool = typer.Option(False, "--debug", help="Enable debug logs (more verbose).") # type: ignore
):
    set_log_debug(debug or context.obj.get("debug", False))

    with log.scoped(Scope.lifecycle):
        return lifecycle.down()
    
    log.error("Scope was incorrectly ignored on CLI lifecycle down.")

    return 1

@cli.command(help="Restarts the application (calls `down` then `up`)")
def restart(
    context: typer.Context,
    debug: bool = typer.Option(False, "--debug", help="Enable debug logs (more verbose).") # type: ignore
):
    set_log_debug(debug or context.obj.get("debug", False))

    with log.scoped(Scope.lifecycle):
        return lifecycle.restart()
    
    log.error("Scope was incorrectly ignored on CLI lifecycle restart.")

    return 1

if __name__ == "__main__":
    cli()
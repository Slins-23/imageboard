import typer
from orchestrator.core import lifecycle
from orchestrator.core import log

cli = typer.Typer()

@cli.callback()
def main(
    debug: bool = typer.Option(False, "--debug", help="Enable debug logs.") # type: ignore
):
    if debug:
        log.set_debug(True)

@cli.command()
def up():
    return lifecycle.up()

@cli.command()
def down():
    return lifecycle.down()

@cli.command()
def restart():
    return lifecycle.restart()

if __name__ == "__main__":
    cli()
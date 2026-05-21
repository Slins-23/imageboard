from orchestrator.core.deployment import deploy, delete

def up() -> int:
    deploy("storage")

    return 0

def down() -> int:
    delete("storage")

    return 0
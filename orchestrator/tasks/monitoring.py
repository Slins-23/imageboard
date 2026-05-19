from orchestrator.core.deployment import deploy, delete

def up() -> int:
    deploy("monitoring")

    return 0

def down() -> int:
    delete("monitoring")

    return 0
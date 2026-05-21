from orchestrator.core.deployment import deploy, delete

def up() -> int:
    deploy("infra")

    return 0

def down() -> int:
    delete("infra")

    return 0
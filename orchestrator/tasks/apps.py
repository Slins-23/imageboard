from orchestrator.core.deployment import deploy, delete

def up() -> int:
    deploy("apps")
    
    return 0

def down() -> int:
    delete("apps")

    return 0
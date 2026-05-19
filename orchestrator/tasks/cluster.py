import orchestrator.core.cluster as cluster

def up() -> int:
    cluster.create()
    cluster.create_namespaces()

    return 0

def down() -> int:
    cluster.delete_namespaces()
    cluster.delete()

    return 0
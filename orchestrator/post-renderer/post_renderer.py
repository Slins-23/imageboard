import sys
import yaml
import json
import os
from pathlib import Path
from typing import Any, cast

# ROOT_DIR = Path(__file__).resolve().parents[2]
# sys.path.insert(0, str(ROOT_DIR))

# import orchestrator.core.log as log
# from orchestrator.core.log import Scope


# OUTPUT_STREAM = "stderr"
# DEBUG = os.environ.get("POST_RENDERER_DEBUG") == "1"

# if DEBUG:
    # #log.set_debug(True)

def _load_context() -> dict[str, Any] | None:
    context_path = os.environ.get("POST_RENDERER_CONTEXT")

    if not context_path:
        #log.info("No context file found.", debug=DEBUG, output_stream=OUTPUT_STREAM)
        return None
    
    context_path = Path(context_path)

    if not context_path.is_file():
        return None
    
    #log.info(f"Loading context from file '{context_path}'", debug=DEBUG, output_stream=OUTPUT_STREAM)

    context = context_path.read_text(encoding="utf-8")
    context = json.loads(context)

    #log.success("Context loaded.", debug=DEBUG, output_stream=OUTPUT_STREAM)
    
    return context

def _get_input_docs() -> list[dict[str, Any]]:
    #log.info("Loading input documents from stdin...", debug=DEBUG, output_stream=OUTPUT_STREAM)

    docs: list[dict[str, Any]] = []

    for doc in yaml.safe_load_all(sys.stdin.read()):
        docs.append(doc)

    #log.success("Input documents loaded.", debug=DEBUG, output_stream=OUTPUT_STREAM)

    return docs

def _pod_spec_path(document: dict[str, Any]) -> list[str] | None:
    #log.info("Getting pod spec path...", debug=DEBUG, output_stream=OUTPUT_STREAM)

    kind = document.get("kind")

    if kind == "Pod":
        return ["spec"]
    elif kind == "CronJob":
        return ["spec", "jobTemplate", "spec", "template", "spec"]
    elif kind in ["Deployment", "Job", "StatefulSet", "DaemonSet", "ReplicaSet"]:
        return ["spec", "template", "spec"]
    
    return None

def _get_pod_spec(document: dict[str, Any], path: list[str]) -> dict[str, Any] | None:
    #log.info(f"Getting pod spec through path: '{'.'.join(path)}'", debug=DEBUG, output_stream=OUTPUT_STREAM)

    doc_keymap: Any = document

    for key in path:
        if not isinstance(doc_keymap, dict) or key not in doc_keymap:
            return None
        
        doc_keymap = cast(dict[str, Any], doc_keymap)

        if doc_keymap is None:
            return None
        
        doc_keymap = doc_keymap[key]

    return cast(dict[str, Any], doc_keymap) if isinstance(doc_keymap, dict) else None

def _list_from_dict(map: dict[str, Any], key: str) -> list[Any]:
    value = map.get(key)

    if value is None:
        value = []
        map[key] = value

    if not isinstance(value, list):
        raise TypeError(f"Key '{key}' is not a list.")    
    
    return cast(list[Any], value)

def _inject_mounts(pod_spec: dict[str, Any], mounts: list[dict[str, Any]]) -> None:
    #log.info(f"Injecting {len(mounts)} mounts...", debug=DEBUG, output_stream=OUTPUT_STREAM)

    containers: Any = pod_spec.get("containers", [])
    
    if not isinstance(containers, list) or not containers:
        return
    
    containers = cast(list[dict[str, Any]], containers)

    for container in containers:
        #log.info(f"Injecting mounts for container '{container.get('name')}'...", debug=DEBUG, output_stream=OUTPUT_STREAM)

        if not isinstance(container, dict):
            return
        
        container = cast(dict[str, Any], container)
        
        volumes_map = _list_from_dict(pod_spec, "volumes")
        volumes_map = cast(list[dict[str, Any]], volumes_map)
        
        volume_mounts = _list_from_dict(container, "volumeMounts")
        volume_mounts = cast(list[dict[str, Any]], volume_mounts)


        for mount in mounts:
            #log.info(f"Injecting mount '{mount.get('name')}'", debug=DEBUG, output_stream=OUTPUT_STREAM)
            if not mount.get("enabled"):
                #log.warn("Mount is disabled. Skipping.", debug=DEBUG, output_stream=OUTPUT_STREAM)
                continue

            volume_name = str(mount["volumeName"])

            source = cast(dict[str, Any], mount["source"])

            mount_path = str(mount["containerPath"])

            read_only = bool(mount.get("readOnly", False))

            removed_volume_names: set[str] = set()
            new_mounts: list[dict[str, Any]] = []

            for existing_mount in volume_mounts:
                if not isinstance(existing_mount, dict): # pyright: ignore[reportUnnecessaryIsInstance]
                    continue

                existing_mount_path = existing_mount.get("mountPath")

                if existing_mount_path == mount_path:
                    existing_volume_name = existing_mount.get("name")

                    if existing_volume_name is None:
                        raise ValueError(f"Volume name for mount at mountPath '{existing_mount_path}' is empty.")

                    removed_volume_names.add(str(existing_volume_name))
                    
                    continue

                new_mounts.append(existing_mount)

            volume_mounts[:] = new_mounts

            new_volumes: list[dict[str, Any]] = []

            for existing_volume in volumes_map:
                if not isinstance(existing_volume, dict): # pyright: ignore[reportUnnecessaryIsInstance]
                    continue

                existing_volume_name = existing_volume.get("name")

                if existing_volume_name in removed_volume_names or existing_volume_name == volume_name:
                    continue

                new_volumes.append(existing_volume)

            volumes_map[:] = new_volumes

            volumes_map.append(
                {
                    "name": volume_name,
                    **source
                }
            )

            volume_mounts.append(
                {
                    "name": volume_name,
                    "mountPath": mount_path,
                    "readOnly": read_only
                }
            )

def _inject_jaeger_mounts(spec: dict[str, Any], mounts: list[dict[str, Any]]) -> None:
    #log.info(f"Injecting {len(mounts)} mount(s) for jaeger...", debug=DEBUG, output_stream=OUTPUT_STREAM)

    volumes = _list_from_dict(spec, "volumes")
    volume_mounts = _list_from_dict(spec, "volumeMounts")

    for mount in mounts:
        #log.info(f"Injecting mount '{mount.get('name')}'", debug=DEBUG, output_stream=OUTPUT_STREAM)
        if not mount.get("enabled"):
            #log.warn("Mount is disabled. Skipping.", debug=DEBUG, output_stream=OUTPUT_STREAM)
            continue

        volume_name = str(mount["volumeName"])
        source = cast(dict[str, Any], mount["source"])
        mount_path = str(mount["containerPath"])
        read_only = bool(mount.get("readOnly", False))

        volumes[:] = [
            volume for volume in volumes
            if volume.get("name") != volume_name
        ]

        volumes.append({
            "name": volume_name,
            **source
        })

        volume_mounts[:] = [
            volume_mount for volume_mount in volume_mounts
            if volume_mount.get("mountPath") != mount_path
        ]

        volume_mounts.append({
            "name": volume_name,
            "mountPath": mount_path,
            "readOnly": read_only
        })

def _inject_document(document: dict[str, Any], mounts: list[dict[str, Any]]) -> None:
    kind = document.get("kind")

    if kind == "Jaeger":
        spec: dict[str, Any] | None = document.get("spec")
        if isinstance(spec, dict):
            _inject_jaeger_mounts(spec, mounts)

        return
    
    spec_path = _pod_spec_path(document)

    if spec_path is None:
        return
    
    pod_spec = _get_pod_spec(document, spec_path)

    if pod_spec is not None:
        _inject_mounts(pod_spec, mounts)

def _deduplicate_docs(documents: list[dict[str, Any]]) -> list[dict[str, Any]]:
    #log.info("Deduplicating potential duplicate documents...", debug=DEBUG, output_stream=OUTPUT_STREAM)

    output: list[dict[str, Any]] = []
    seen: set[tuple[str, str, str]] = set()

    for document in documents:
        kind = str(document.get("kind", ""))

        metadata = document.get("metadata")
        metadata = cast(dict[str, Any], metadata) if isinstance(metadata, dict) else {}

        name = str(metadata.get("name", ""))
        namespace = str(metadata.get("namespace", ""))

        id = (kind, name, namespace)

        if id in seen:
            continue

        seen.add(id)
        output.append(document)

    return output

def load_generated_documents(generated_dir: Path) -> list[dict[str, Any]]:
    #log.info("Loading generated documents...", debug=DEBUG, output_stream=OUTPUT_STREAM)
    documents: list[dict[str, Any]] = []

    for path in generated_dir.glob("*.yaml"):
        #log.info(f"Loaded document at {path}", debug=DEBUG, output_stream=OUTPUT_STREAM)

        with open(path, mode="r", encoding="utf-8") as document_file:
            documents.extend(
                document
                for document in yaml.safe_load_all(document_file)
                if document
                )

    return documents

def main() -> int:
    #log.info("Loading context...", debug=DEBUG, output_stream=OUTPUT_STREAM)
    context = _load_context()

    if context is None:
        #log.warn("Context was 'None'.", debug=DEBUG, output_stream=OUTPUT_STREAM)

        sys.stdout.write(sys.stdin.read())
        return 0

    generated_dir = Path(context["generatedDir"])
    mounts = context.get("mounts", [])

    input_docs = _get_input_docs()
    output_docs: list[dict[str, Any]] = load_generated_documents(generated_dir)

    for document in input_docs:
        _inject_document(document, mounts)
        output_docs.append(document)

    output_docs = _deduplicate_docs(output_docs)

    #log.info(f"Writing output documents to stdout (Helm uses these).", debug=DEBUG, output_stream=OUTPUT_STREAM)

    try:
        yaml.safe_dump_all(output_docs, sys.stdout, sort_keys=False)
    except Exception as e: # pyright: ignore[reportUnusedVariable]
        #log.error(f"Could not write output documents to stdout.\nError: {e}", debug=DEBUG, output_stream=OUTPUT_STREAM)
        return 1

    return 0

if __name__ == "__main__":
    #log.info("Running custom post-renderer...", debug=DEBUG, output_stream=OUTPUT_STREAM)
    result = main()

    # with #log.scoped(Scope.post_renderer):
    

        # result = main()

        # if result == 0:
    #log.success("Successfully executed the post-renderer.", debug=DEBUG, output_stream=OUTPUT_STREAM)
        # else:
    # #log.error("Failed executing the post-renderer.", debug=DEBUG, output_stream=OUTPUT_STREAM)

        # raise SystemExit(result)
    
    raise SystemExit(result)
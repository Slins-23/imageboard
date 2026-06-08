from pathlib import Path
import orchestrator.config as config
import orchestrator.core.log as log

def resolve_relative(*, raw: str | None = None, service_dir: Path | None = None, default_leaf: str | None = None) -> Path | None:
    log.info(f"Resolving relative path. Raw: {raw} | Service dir: {str(service_dir)} | Default leaf: {default_leaf}", debug=True)

    final_path = ""

    if raw is None or str(raw).strip() == "":
        if default_leaf is None:
            log.info(f"Path resolved from '{raw}' to: 'None'.", debug=True)

            return None
    
        if service_dir is not None:
            final_path = (service_dir / default_leaf).resolve()

            log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", debug=True)

            return final_path
        else:
            final_path = (config.ROOT_DIR / default_leaf).resolve()

            log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", debug=True)

            return final_path
    
    raw = str(raw).strip()

    if raw in {".", "./"}:
        if default_leaf is None:

            log.info(f"Path resolved from '{raw}' to: 'None'.", debug=True)

            return None
        
        if service_dir is not None:
            final_path = (service_dir / default_leaf).resolve()

            log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", debug=True)

            return final_path
        else:

            final_path = (config.ROOT_DIR / default_leaf).resolve()

            log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", debug=True)
        
            return final_path

    if raw.startswith("./"):
        raw = raw[2:]
        if service_dir is not None:
            final_path = (service_dir / raw).resolve()

            log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", debug=True)
            
            return final_path
    
    resolved_path = Path(raw)

    if resolved_path.is_absolute():
        final_path = resolved_path.resolve()
        
        log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", debug=True)
        
        return final_path
    
    final_path = (config.ROOT_DIR / resolved_path).resolve()

    log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", debug=True)
    
    return final_path

def kind_path(host_path: Path) -> Path:
    try:
        root_relative = host_path.resolve().relative_to(config.ROOT_DIR.resolve())
    except:
        raise ValueError(f"Invalid kind host path '{host_path}'. It must be within the project's directory.")
    
    return Path("/mnt") / root_relative
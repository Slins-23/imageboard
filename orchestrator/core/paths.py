from pathlib import Path
import orchestrator.config as config
import orchestrator.core.log as log

def resolve_relative(*, raw: str | None = None, service_dir: Path | None = None, default_leaf: str | None = None, scope: str) -> Path | None:
    if log.cfg.debug:
        log.info(f"Resolving relative path. Raw: {raw} | Service dir: {str(service_dir)} | Default leaf: {default_leaf}", scope)

    final_path = ""

    if raw is None or str(raw).strip() == "":
        if default_leaf is None:
            if log.cfg.debug:
                log.info("Path resolved from '{raw}' to: 'None'.", scope)
            return None
    
        if service_dir is not None:
            final_path = (service_dir / default_leaf).resolve()
            if log.cfg.debug:
                log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", scope)

            return final_path
        else:
            final_path = (config.ROOT_DIR / default_leaf).resolve()

            if log.cfg.debug:
                log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", scope)

            return final_path
    
    raw = str(raw).strip()

    if raw in {".", "./"}:
        if default_leaf is None:
            if log.cfg.debug:
                log.info("Path resolved from '{raw}' to: 'None'.", scope)
            return None
        
        if service_dir is not None:
            final_path = (service_dir / default_leaf).resolve()

            if log.cfg.debug:
                log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", scope)

            return final_path
        else:

            final_path = (config.ROOT_DIR / default_leaf).resolve()

            if log.cfg.debug:
                log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", scope)
        
            return final_path

    if raw.startswith("./"):
        raw = raw[2:]
        if service_dir is not None:
            final_path = (service_dir / raw).resolve()

            if log.cfg.debug:
                log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", scope)
            
            return final_path
    
    resolved_path = Path(raw)

    if resolved_path.is_absolute():
        final_path = resolved_path.resolve()

        if log.cfg.debug:
                log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", scope)
        
        return final_path
    
    final_path = (config.ROOT_DIR / resolved_path).resolve()

    if log.cfg.debug:
        log.info(f"Path resolved from '{raw}' to: '{str(final_path)}'.", scope)
    
    return final_path

def kind_path(host_path: Path) -> Path:
    try:
        root_relative = host_path.resolve().relative_to(config.ROOT_DIR.resolve())
    except:
        raise ValueError(f"Invalid kind host path '{host_path}'. It must be within the project's directory.")
    
    return Path("/mnt") / root_relative
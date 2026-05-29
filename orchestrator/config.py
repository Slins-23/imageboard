from pathlib import Path
from dotenv import load_dotenv
import os

ROOT_DIR = Path(__file__).parents[1].resolve()
BACKEND_DIR = ROOT_DIR / "backend"
FRONTEND_DIR = ROOT_DIR / "frontend"
PLATFORM_DIR = ROOT_DIR / "platform"
DEPLOYMENT_DIR = PLATFORM_DIR / "deployment"
KIND_DIR = PLATFORM_DIR / "cluster/kind"
CONTRACTS_DIR = ROOT_DIR / "contracts"

load_dotenv(ROOT_DIR / ".env")

CLUSTER_NAME = os.getenv("CLUSTER_NAME", "cluster")
NGINX_PORT = int(os.getenv("NGINX_PORT", 8080))
ISTIO_PORT = int(os.getenv("ISTIO_PORT", 5000))

NETWORKING_DIR = PLATFORM_DIR / "networking"

DEFAULT_NAMESPACE = os.getenv("DEFAULT_NAMESPACE", "default")
SERVICE_DESCRIPTOR_NAME = os.getenv("SERVICE_DESCRIPTOR_NAME", "deploy.yaml")

POST_RENDERER_PATH = str((ROOT_DIR / "orchestrator" / "post-renderer" / "run.sh").resolve())

DEFAULT_STORAGE_CAPACITY = os.getenv("DEFAULT_STORAGE_CAPACITY", "10Gi")
DEFAULT_STORAGE_REQUEST = os.getenv("DEFAULT_STORAGE_REQUEST", "10Gi")

TEMPLATES_DIR = DEPLOYMENT_DIR / "templates"
GENERATED_DIR = DEPLOYMENT_DIR / "generated"
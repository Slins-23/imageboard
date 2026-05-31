# Imageboard (WIP)

<h3>A full-stack imageboard application.</h3>

This is a work in progress.

# Table of contents

- [Introduction](#introduction)
- [Project structure](#project-structure)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [User-facing endpoints](#user-facing-endpoints)
- [Orchestrator](#orchestrator)
  - [Environment variables](#environment-variables)
  - [Lifecycle](#lifecycle)
  - [Deployment](#deployment)
  - [Post Renderer](#post-renderer)
  - [Service descriptor](#service-descriptor)
  - [Context](#context)
- [Notes](#notes)
  - [Namespaces](#namespaces)
  - [Networking model](#networking-model)
  - [Local storage and permissions](#local-storage-and-permissions)
- [Future plans](#future-plans)

# Introduction

The goal is to build a large-scale global imageboard website, learn and integrate as many technologies at once as possible, all while attempting to replicate a production/real-world environment as close as possible locally.

Everything has been mostly designed in Figma (subject to adjustments) since mid 2025, including the backend, frontend, and system design.

The reusable component library (and therefore most of the frontend) is mostly finished. As I have made the component library using Storybook, all that's left is wiring together the components into pages for the website and connecting to the backend.

I am currently integrating the backend.

This is what the backend consists of thus far:

\- Docker and Kubernetes for containerization and service orchestration

\- Kind for creating and running the Kubernetes cluster locally

\- Helm charts for templating, sensible defaults and deployment

\- A custom Python orchestrator for controlling the project

\- NGINX as the external reverse proxy

\- Istio as the cluster ingress, internal API gateway and service mesh

\- Zod contracts shared between services

\- OpenAPI schema generation from Zod schemas

\- Swagger UI using the generated OpenAPI schema for API documentation

\- Prometheus for metrics aggregation

\- Grafana for visualization

\- Jaeger for tracing requests

\- PostgreSQL databases

Some things I had planned with production in mind are not feasible, practical, or reasonable locally, such as replicated pods/containers, sharding, failover, load balancing, worldwide server distribution, cross-region cluster synchronization, cold storage backups, CDNs, etc.
<br>This is either because my machine can't handle everything or because the implementation/maintenance slows development down drastically for little to no benefit, or even to detriment.
<br>In fact, my computer barely handles it right now, as it reaches 10-20GB+ RAM while idling under WSL2, which made me give up emulating many nodes with Kind, among other things.

Therefore, in this project I tried to emulate a large production environment as close as possible without making extreme or unreasonable compromises.

The general idea is:

1. The frontend is an application made alongside a reusable component library, with TypeScript, Next.js, and Storybook.
2. Public API calls go through BFF (Backend for Frontend) services.
3. Shared Zod contracts live under `contracts` and are used to validate requests and generate OpenAPI documentation.
4. BFF services communicate with internal data-access layer services.
5. Data-access layer services communicate with databases and other internal infrastructure.
6. The whole environment is deployed locally through Kubernetes, Helm, Istio, NGINX, and the custom orchestrator.

I tried to emulate a real production request flow as close as possible:

`Browser -> NGINX -> Istio ingress gateway -> Kubernetes services -> BFF/DAL/database`

This makes the local setup overly complex compared to a normal development or even production environment, but that also means the project deals with many of the real-world challenges a real system would have and more: external routing, internal service communication, service discovery, generated API documentation, shared contracts, persistent storage, observability, deployment ordering, orchestration, permissions across host/container boundaries, etc.

# Project structure

The most relevant folders are:

| Path                          | Description                                                                                             |
| :---------------------------- | :------------------------------------------------------------------------------------------------------ |
| frontend                      | Frontend service descriptor and values                                                                  |
| frontend/src                  | Frontend source code                                                                                    |
| backend                       | Backend services                                                                                        |
| backend/bff                   | Backend for Frontend services                                                                           |
| backend/dal                   | Data-access layer services                                                                              |
| contracts                     | Shared Zod contracts and generated OpenAPI schema                                                       |
| orchestrator                  | Project's custom Python orchestrator                                                                    |
| orchestrator/post-renderer    | Helm [post renderer](#post-renderer) plugin for the orchestrator                                        |
| platform                      | Platform services, charts, templates, generated deployment files                                        |
| platform/deployment/charts    | Shared base Helm charts used by multiple services                                                       |
| platform/deployment/templates | Base templates for YAML manifests used by the orchestrator for generating PVs, PVCs, and migration jobs |
| platform/deployment/generated | Generated deployment files for each service                                                             |
| install.sh                    | Helper shell script for installing the [orchestrator](#orchestrator)                                    |

# Tech stack

| Type          | Technology                         | Usage                                                                        |
| :------------ | :--------------------------------- | :--------------------------------------------------------------------------- |
| Frontend      | TypeScript, Vite, Node.js, Next.js | Frontend application                                                         |
| Frontend      | Storybook                          | Component library development and testing                                    |
| Backend       | TypeScript, Node.js, Express.js    | BFF and DAL service runtime                                                  |
| Database      | PostgreSQL                         | Used for databases such as `users-auth` which is used in user authentication |
| Contracts     | TypeScript, Zod                    | Shared validation schemas for all services                                   |
| Contracts     | OpenAPI                            | Schema generated from Zod                                                    |
| Docs          | Swagger UI                         | Browser UI for the generated OpenAPI schema                                  |
| Monitoring    | Prometheus                         | Metrics aggregation                                                          |
| Monitoring    | Grafana                            | Metrics visualization                                                        |
| Monitoring    | Jaeger                             | Distributed tracing                                                          |
| Networking    | Istio                              | Cluster ingress, internal API gateway and service mesh                       |
| Networking    | NGINX                              | External reverse proxy/load balancer                                         |
| Cluster       | Kubernetes, Kind                   | Local Kubernetes cluster                                                     |
| Containers    | Docker                             | Containers and NGINX reverse proxy                                           |
| Deployment    | Helm                               | Managing releases and chart templating                                       |
| Orchestration | Python, Typer                      | Custom orchestration CLI                                                     |

# Prerequisites

### Tested on Ubuntu 24.04 under WSL2 on a Windows 11 host

| Dependency        | Version               |
| :---------------- | :-------------------- |
| Python            | <b><i>v3.12.3</i></b> |
| Docker            | <b><i>v29.4.0</i></b> |
| Kubernetes client | <b><i>v1.35</i></b>   |
| Kind              | <b><i>v0.31.0</i></b> |
| Helm              | <b><i>v4.1.4</i></b>  |

<i>(Optional for creating database migrations)</i><br>
golang-migrate: <b><i>v4.19.1</i></b>

# Usage

Run `install.sh` once, then call the [orchestrator](#orchestrator) through the `orchestrator` command.

```bash
./install.sh
orchestrator up
```

See [orchestrator](#orchestrator) for information on the available commands and options.

There is no need to reinstall when changes are made to the orchestrator, they are automatically accounted for.

# User-facing endpoints

<b><i>Everything below assumes default settings</i></b>

| Service                                           | URL                       |
| :------------------------------------------------ | :------------------------ |
| Frontend Next.js dev server / NGINX reverse proxy | localhost:8080            |
| Storybook                                         | storybook.localhost:8080  |
| Public API                                        | localhost:8080/api        |
| Swagger UI                                        | swagger.localhost:8080    |
| Prometheus                                        | prometheus.localhost:8080 |
| Grafana                                           | grafana.localhost:8080    |
| Jaeger                                            | jaeger.localhost:8080     |
| Istio ingress/API gateway                         | localhost:5000            |

<br>Grafana credentials:

| Key      | Value |
| :------- | :---- |
| User     | admin |
| Password | 12345 |

<br>The APIs are described in (besides implementation in services):

- Zod schemas at `contracts`
- OpenAPI schema generated at `contracts/generated/openapi.json`
- Swagger UI as a frontend for the OpenAPI schema

Persistent data location can be modified in each [service's descriptor](#service-descriptor). I have opted for colocating it with the service definition.

Persistent data location for monitoring services:

- Prometheus: `platform/monitoring/prometheus/data`
- Grafana: `platform/monitoring/grafana/data`
- Jaeger: `platform/monitoring/jaeger/instance/data`

<br>The public API is exposed as a REST API through BFF (backend for frontend) services (e.g. `bff-users`), which acts as an intermediate layer between public API calls and internal API calls such as the DAL (data-access layer) services (e.g. `users-auth-dal`).

# Orchestrator

The orchestrator lives under `orchestrator`, it is a custom Python module that controls the lifecycle of the application, logging, deployment, and file/folder permissions.<br>

It is controllable through the CLI, which exposes the following commands:<br>

`orchestrator up`: Starts the application.<br>

`orchestrator down`: Deletes the application (except persistent data).<br>

`orchestrator restart`: Restarts the application (calls `down` then `up`).<br>

`orchestrator --help` or `orchestrator`: Shows available commands and options.<br>

`--debug`: Enable debug logs (more verbose). Position/order does not matter.<br>

It is installed from running `install.sh`. Source file changes are reflected automatically, so there's no need to reinstall.

<br>`install.sh`:

1. Installs the [post renderer](#post-renderer) as a Helm plugin
2. Enables execute permission for `orchestrator/post-renderer/run.sh`
3. Creates the Python virtual environment for executing the orchestrator
4. Installs the orchestrator dependencies from `requirements.txt`
5. Installs the orchestrator in editable mode within the virtual environment
6. Symlinks that executable from the virtual environment to `$HOME/.local/bin/orchestrator`, where `$HOME` is the path to the user's home directory
7. Adds `$HOME/.local/bin` to the user's `PATH` environment variable if not already there, so that the `orchestrator` executable is globally accessible.
   - Assuming `bash` and `.bashrc` are used for the user's shell, otherwise you can copy and paste the `export` command logged to the terminal in the terminal itself or your shell's configuration file.

<br>

It lives under the virtual environment `venv` within the project root, which is symlinked to `$HOME/.local/bin`, where `$HOME` is the path to the user's home folder, then it is also added to the user's `PATH` if not already included, so that it can be called anywhere through `orchestrator`.

It loads its configuration from `orchestrator/config.py`, where some values are hardcoded and others are loaded from the `.env`, or set to a default value if not given.

## Environment variables

These can be modified in `.env`.<br>
If not specified, they are set to the following default values in `orchestrator/config.py`:

| Key                      | Value       |
| :----------------------- | :---------- |
| CLUSTER_NAME             | cluster     |
| NGINX_PORT               | 8080        |
| ISTIO_PORT               | 5000        |
| SERVICE_DESCRIPTOR_NAME  | deploy.yaml |
| DEFAULT_NAMESPACE        | default     |
| DEFAULT_STORAGE_CAPACITY | 10Gi        |
| DEFAULT_STORAGE_REQUEST  | 10Gi        |

<br>`POST_RENDERER_CONTEXT` is also used internally for sharing the file path of the [context](#context) file with the current service in the deployment pipeline with the [post renderer](#post-renderer). It is not meant to be manually configured in `.env`.<br>
The orchestrator sets it for each service before calling Helm, so the [post renderer](#post-renderer) knows which generated [context.json](#context) to load.

## Lifecycle

At a high-level, this is what calling `orchestrator up` does:

1. Removes resources from potentially running app.
2. Takes ownership of the app root.
3. Installs root and workspaces npm packages.
   - Needed for development environment syntax validation from Zod contracts.
4. Generates an OpenAPI spec file from the Zod schemas at `contracts` to `contracts/generated/openapi.json`.
5. Discovers enabled services from `deploy.yaml` files.
6. Creates `Service` (`orchestrator/models/service.py`) and `Mount` (`orchestrator/models/mount.py`) objects from parsing [deploy.yaml](#service-descriptor).
7. Writes a Kind config file from a template to mount the project files onto the cluster nodes at `/mnt`.
8. Creates the Kind cluster.
9. Creates the cluster namespaces
10. Sets up networking
    - Writes NGINX `default.conf` from template and environment variables.
    - Starts NGINX at the given port (default `8080`) through a regular docker container.
    - Deploys all Istio services.
    - Starts Istio ingress at given port (default `5000`).
11. Deploys infrastructure services with the `infra` type.
12. Deploys storage services with the `storage` type.
13. Deploys monitoring services with the `monitoring` type.
14. Deploys application services with the `apps` type.
15. Logs success (or error) message to the terminal including the address of relevant frontend/service services.

Some of this is logged by default. More in-depth logs can be seen by including the `--debug` option in the call to `orchestrator`.

## Deployment

<b>All dynamically generated service deployment files, such as YAML manifests for persistent volumes, persistent volume claims, migration jobs as well as [context.json](#context), are stored in `platform/deployment/generated/${SERVICE_NAME}`, where `SERVICE_NAME` is the name of the respective service.</b>

At a high-level, this is how service deployment works (mostly implemented at `orchestrator/core/deployment.py`):

1. Discovers enabled services and their configuration by parsing [service descriptors](#service-descriptor), which are named [deploy.yaml](#service-descriptor) by default.
   - The expected [service descriptor](#service-descriptor) filename can be modified through the `SERVICE_DESCRIPTOR_NAME` environment variable in `.env`.
   - Services are stored internally as `Service` objects, defined in `orchestrator/models/service.py`.
   - Mounts are stored internally as `Mount` objects, defined in `orchestrator/models/mount.py`.

2. Topologically sorts all services as a dependency graph using depth-first search, installing dependencies first and preventing circular dependencies.

3. Fixes ownership and permissions for mount folders/files.
   - Some services need the host, Kind nodes, Kubernetes pods, and Docker containers to all be able to read/write shared paths.

4. Dynamically generates Kubernetes manifests where needed.
   - The base templates are at `platform/deployment/templates`.
   - Persistent mounts generate a PV/PVC pair.
   - Source mounts use a direct `hostPath`.
   - PostgreSQL migration jobs are generated when `migrations.enabled` is set in the [service descriptor](#service-descriptor).

5. Generates the [service context](#context) within the same generated folder.
   - It includes metadata about the service, such as generated documents and mounts.
   - It will be used by the [post renderer](#post-renderer).

6. Calls Helm to install the service.
   - If the [service descriptor](#service-descriptor) has a `file` field, it is passed to Helm as a values override with `-f`.
   - If the [service descriptor](#service-descriptor) has `wait: true`, Helm is called with `--wait`.
   - The generated [context.json](#context) path is passed to the [post renderer](#post-renderer) through `POST_RENDERER_CONTEXT`.

7. The [post renderer](#post-renderer) intercepts the Helm installation: it ingests the unmodified manifests which Helm sends to `stdin`, manipulates them to inject our generated data, then writes them to `stdout`.

8. Helm then uses the manipulated manifests from `stdout` to perform the final deployment.

9. Waits for cluster resources if given in `waitFor`.
   - Supports waiting for CRD, deployment, endpoint and/or webhook.

10. Logs success or error.

## Post Renderer

The [post renderer](#post-renderer) lives under `orchestrator/post-renderer` and is installed as a Helm plugin through `install.sh`.

The Helm post renderer here is necessary to dynamically modify YAML manifests before they are installed, as necessary.<br>
This is useful for dynamically creating entire new manifests from existing templates at `platform/deployment/templates` such as migration jobs, persistent volumes and persistent volume claims, as well as modifying existing manifests, such as programmatically mounting the generated persistent volumes and persistent volume claims onto container images.<br>
Everything can be arbitrarily described in each service's [service descriptor](#service-descriptor) file ([deploy.yaml](#service-descriptor)).

The post renderer works by receiving the manifests as they are defined through `stdin`, then returning the final modified manifests through `stdout`.

Its flow is:

1. Loads [context.json](#context) as a dictionary using the file path set through the `POST_RENDERER_CONTEXT` environment variable.
   - If no context is found, it writes Helm's original `stdin` back to `stdout` without changing it.

2. Loads generated YAML documents from the service's generated folder, such as PVs, PVCs, and migration Jobs.

3. Reads the YAML manifests rendered by Helm from `stdin` as a list of dictionaries.

4. Injects content into the manifests that need it.
   - For usual Kubernetes resources (`Pod`, `Deployment`, `StatefulSet`, `DaemonSet`, `ReplicaSet`, `Job`, `CronJob`), it finds the pod spec and injects volumes and volume mounts into the containers.
   - For Jaeger, it uses a special path as the Jaeger operator expects volumes and volume mounts directly under the Jaeger custom resource spec.

5. If a mount already exists at the same container path, it is replaced instead of duplicated.

6. Each manipulated document is added to the output document list.

7. The output document list is deduplicated by Kubernetes kind, metadata name and namespace.

8. The final documents are written to `stdout`, where they are captured by Helm and subsequently installed.

This is why the [post renderer](#post-renderer) currently has logging disabled: writing logs to `stdout` malforms the manifests expected by Helm. I tried writing them to `stderr`, but it didn't work either, so for now I decided to comment out the logs in `orchestrator/post-renderer/post_renderer.py`.

## Service descriptor

The filename of a service descriptor is expected to be `deploy.yaml` by default. It can be changed through the environment variable `SERVICE_DESCRIPTOR_NAME`.

The descriptor is a small custom configuration layer. Helm still owns templating, values and installation, but `deploy.yaml` tells the orchestrator where the chart is, which service group it belongs to, which mounts need to be injected, which service dependencies must be installed first, and which extra resources must be generated before Helm finishes the deployment.

The most relevant fields are:

| Field      | Description                                                                                                                   |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------- |
| name       | Service name. This is also used for the Helm release name and for the generated folder under `platform/deployment/generated`. |
| enabled    | If `false`, the service is ignored.                                                                                           |
| type       | Deployment group, such as `infra`, `storage`, `monitoring`, or `apps`.                                                        |
| namespace  | Kubernetes namespace. Defaults to `DEFAULT_NAMESPACE`.                                                                        |
| chart      | Helm chart path.                                                                                                              |
| file       | Optional values file passed to Helm with `-f`.                                                                                |
| dependsOn  | Other service names that must be deployed first.                                                                              |
| mounts     | Source or persistent mounts that the [post renderer](#post-renderer) injects into the rendered manifests.                     |
| migrations | Optional database migration job configuration.                                                                                |
| wait       | Whether Helm should wait for the release.                                                                                     |
| waitFor    | Additional cluster resources the orchestrator should wait for after Helm finishes.                                            |

<br>The accepted path formats for `chart` and `file` are:

- `./chart` or `./values.yaml` resolves relative to the folder where the descriptor lives.
- `platform/deployment/charts/node-app` resolves relative to the project root.
- Absolute paths are used as-is.
- Mount paths must be inside the project root, as we mount the entire project at `/mnt` through Kind onto the nodes.

<br>Mounts can be one of two types:

- `source`: Injected as a direct `hostPath`, useful for development source code, contracts, generated OpenAPI files, etc.<br>
- `persistent`: Generates a PV/PVC pair and injects the PVC into the workload, useful for services which write data themselves, such as database and monitoring services.

<br>Example `deploy.yaml` for `users-auth-postgres` at `platform/storage/databases/postgresql/users-auth`:

```yaml
name: users-auth-postgres
enabled: true
type: storage
namespace: databases
chart: platform/storage/databases/postgresql/chart
file: ./values.yaml
mounts:
  - name: data
    enabled: true
    type: persistent
    readOnly: false
    hostPath: ./data
    containerPath: /var/lib/postgresql/data
```

<br>Example `values.yaml`:

```yaml
db:
  name: users-auth
  username: admin
  password: 12345
  database: users_auth
```

<br>Example `deploy.yaml` for `users-auth-dal` at `backend/dal/users/users-auth`:

```yaml
name: users-auth-dal
enabled: true
type: apps
namespace: apps
chart: platform/deployment/charts/node-app
file: ./values.yaml
dependsOn:
  - users-auth-postgres
mounts:
  - name: development
    type: source
    enabled: true
    readOnly: false
    hostPath: ./src
    containerPath: /app

  - name: contracts
    type: source
    enabled: true
    readOnly: true
    hostPath: contracts
    containerPath: /contracts

migrations:
  enabled: true
  target: users-auth-postgres
  hostPath: ./migrations
  containerPath: /migrations
```

<br>Example `values.yaml`:

```yaml
fullnameOverride: "users-auth-dal"

replicaCount: 1

image:
  repository: node
  tag: 24.15.0-bookworm
  # This sets the pull policy for images.
  pullPolicy: IfNotPresent

container:
  command: ["sh", "-c"]
  args:
    [
      "cd /app && npm install && mkdir -p node_modules/@app && ln -sf /contracts node_modules/@app/contracts && NODE_OPTIONS=--preserve-symlinks npm run dev",
    ]

# This is for setting up a service more information can be found here: https://kubernetes.io/docs/concepts/services-networking/service/
service:
  # This sets the service type more information can be found here: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
  type: ClusterIP
  # This sets the ports more information can be found here: https://kubernetes.io/docs/concepts/services-networking/service/#field-spec-ports
  port: 80
```

<br>

Migrations are currently PostgreSQL only.
<br>When enabled, the orchestrator finds the target database service, reads its values file, generates a Helm hook Job using `platform/deployment/templates/migration.template.yaml`, waits for PostgreSQL to accept connections, then runs `migrate/migrate` (golang-migrate) against the target database.

## Context

[context.json](#context) is the contract between the orchestrator and the [post renderer](#post-renderer).

It is generated per service at:

`platform/deployment/generated/${SERVICE_NAME}/context.json`

It contains:

| Key          | Description                                                                       |
| :----------- | :-------------------------------------------------------------------------------- |
| serviceName  | Name of the service being deployed.                                               |
| serviceType  | Service group/type, such as `infra`, `storage`, `monitoring`, or `apps`.          |
| generatedDir | Absolute path to the generated folder for that service.                           |
| documents    | Generated manifests related to the service, such as PVs, PVCs and migration Jobs. |
| mounts       | Mount metadata used by the [post renderer](#post-renderer).                       |

<br>Each mount includes the original host path, the Kind path under `/mnt`, the container path, whether it is read-only, the generated volume name, and the Kubernetes volume source to inject.

For example:

- A `source` mount becomes a `hostPath` volume.
- A `persistent` mount becomes a `persistentVolumeClaim` volume, while the PV/PVC manifests themselves are generated into the same service folder.

<br>Example `context.json` generated for `users-auth-postgres`:

```json
{
  "serviceName": "users-auth-postgres",
  "serviceType": "storage",
  "generatedDir": "/home/slins/Programming/Web/App/platform/deployment/generated/users-auth-postgres",
  "documents": [
    "/home/slins/Programming/Web/App/platform/deployment/generated/users-auth-postgres/data.pv.yaml",
    "/home/slins/Programming/Web/App/platform/deployment/generated/users-auth-postgres/data.pvc.yaml"
  ],
  "mounts": [
    {
      "name": "data",
      "enabled": true,
      "type": "persistent",
      "readOnly": false,
      "hostPath": "/home/slins/Programming/Web/App/platform/storage/databases/postgresql/users-auth/data",
      "kindPath": "/mnt/platform/storage/databases/postgresql/users-auth/data",
      "containerPath": "/var/lib/postgresql/data",
      "volumeName": "users-auth-postgres-data",
      "source": {
        "persistentVolumeClaim": {
          "claimName": "users-auth-postgres-data-pvc"
        }
      },
      "capacity": "10Gi"
    }
  ]
}
```

Example for `users-auth-dal`:

```json
{
  "serviceName": "users-auth-dal",
  "serviceType": "apps",
  "generatedDir": "/home/slins/Programming/Web/App/platform/deployment/generated/users-auth-dal",
  "documents": [
    "/home/slins/Programming/Web/App/platform/deployment/generated/users-auth-dal/users-auth-dal.migrate-job.yaml"
  ],
  "mounts": [
    {
      "name": "development",
      "enabled": true,
      "type": "source",
      "readOnly": false,
      "hostPath": "/home/slins/Programming/Web/App/backend/dal/users/users-auth/src",
      "kindPath": "/mnt/backend/dal/users/users-auth/src",
      "containerPath": "/app",
      "volumeName": "users-auth-dal-development",
      "source": {
        "hostPath": {
          "path": "/mnt/backend/dal/users/users-auth/src"
        }
      },
      "capacity": "10Gi"
    },
    {
      "name": "contracts",
      "enabled": true,
      "type": "source",
      "readOnly": true,
      "hostPath": "/home/slins/Programming/Web/App/contracts",
      "kindPath": "/mnt/contracts",
      "containerPath": "/contracts",
      "volumeName": "users-auth-dal-contracts",
      "source": {
        "hostPath": {
          "path": "/mnt/contracts"
        }
      },
      "capacity": "10Gi"
    }
  ]
}
```

# Notes

Some relevant data can be modified through the `.env` file, such as the ports for the Next.js dev server/NGINX reverse proxy, Istio ingress, etc.

## Namespaces

| Namespace    | Description                                                                                      |
| :----------- | :----------------------------------------------------------------------------------------------- |
| cert-manager | Where cert-manager lives.                                                                        |
| istio-system | Where all Istio deployments go, including the ingress.                                           |
| registry     | Reserved for the future central registry API services, such as NPM packages, Docker images, etc. |
| messaging    | Reserved for the future messaging services such as Kafka, RabbitMQ, etc.                         |
| monitoring   | Where all monitoring services live, such as Prometheus, Grafana, Jaeger, etc.                    |
| databases    | Where all database services live, such as PostgreSQL, Redis, Cassandra, etc.                     |
| apps         | Where application services live, such as the frontend, Swagger UI, BFF, DAL, etc.                |

## Networking model

Connection is meant to mirror a real-world pathway. Thus, I separated it in two layers:

1. External: What the end user sees - public-facing extra-cluster edge server.
   - This is the first barrier of entry, where a public-facing NGINX server runs, behaving as a load balancer/reverse proxy.
   - My approach was to run it directly on the host machine through a docker container - extra-cluster.
   - However, this is not where the request stops, as NGINX proxies it to the Istio ingress in the cluster (which is why Istio is also exposed through port-forwarding)

2. Internal: What the user doesn't see - the cluster itself and internal services.
   - This is where the request from NGINX arrives in the cluster, at the cluster edge through Istio as an API gateway.
   - Istio also acts as a service mesh, so it is also responsible for (through Envoy sidecars) handling inter-service communication where sidecar injection is enabled.

This distinction is important as although you can access these services externally due to proxy routing and redirection at the aforementioned addresses and ports, this is not where or how service inter-communication and direct calls to services happen (only indirectly).

Internally, services have their own names and ports, likely distinct from those exposed to the users, and like in a real-world scenario, as a user who has access to these public-facing services/interfaces, you cannot directly query them without being part of the cluster (which the services themselves are, but NGINX isn't, and neither are you, unless you enter the pods/containers and/or execute commands from within).

All that to say: the service names and ports are usually different intra-cluster from those I've listed, and are not directly accessible.

You can only access them directly through `kubectl run` or `kubectl exec`, through proxying `platform/networking/istio/istio-ingress-cfg/chart/templates/routing_table.yaml`, or by querying from another service within the cluster itself, through `app-svc:svc-port` if on the same namespace, or `app-svc.namespace.svc.cluster.local` from any namespace.

## Local storage and permissions

Root access is necessary as the request/file path flows through multiple mutually exclusive environments:

`Host (WSL2) -> Kind -> Nodes (Kubernetes) -> Pods (Kubernetes) -> Containers (Docker)`

Folders are sometimes created by the user or the container and neither side usually has read/write access over the other. Some containers also expect specific user and group ids.

This is necessary due to the unconventional and relatively complex setup where I use a hacky combination of attempting to emulate production within the same development environment, while also using and handling WSL2, Kind, local storage file mounts, persistence, permission requirements within containers (which also often reset permissions through init containers or require explicit users/permissions), etc.

In this setup, permissions are shared bidirectionally in such a way that the system is practically write-agnostic.<br>
This means for example, that hot-reloading works in servers that expect changes such as BFF, DAL, Frontend, Storybook, etc. whether the container itself modifies the files or I do from the host system. The same goes for shared files such as the Zod schemas under `contracts`.

Ideally, in a production environment you would instead use the service's VM host for persistence or a network volume.
<br>It would also be preferred to build Docker images for each service, through a local development environment and a CI layer, where the production/staging image should already include the necessary files, avoiding the need for all of the cognitive, theoretical, and practical burden of synchronizing these mutually exclusive environments.

# Future plans

- Finish wiring the frontend pages together from the existing reusable component library.

- Broaden the coverage of the REST APIs for the future DAL and BFF services.

- Migrate internal APIs to gRPC where applicable, such as DAL services. Use REST APIs only for public-facing services such as BFF services.

- Integrate Kafka, Logstash, Elasticsearch, Cassandra, Sentry, and Redis.

- Create a registry API for push/pulling data shared by services, such as custom Docker images, NPM packages, AI model versioning, etc.

- Turn `contracts` into a standalone NPM package registered in a central registry API.

- Give more descriptive error messages in data-access layer API responses from Zod validation, while avoiding leaking internal information to the BFF. E.g.: "Password too short", "Username too long", etc.

- Create job(s) for periodically dumping databases (e.g. `pg_dump` `users_auth` from `users-auth-postgres`).

- Add unit and end-to-end tests using Jest/Vite and Cypress/Playwright.

- Create database/API tests, such as checking whether services are responding, returning correctly formatted responses, and using correct status codes.

- Create a setup installation pipeline which installs all project dependencies, including binaries such as Helm, Kubernetes, etc.

- Integrate CI/CD tools such as GitHub Actions, Jenkins, Argo, Terraform, etc.

- Add pre-commit hooks for formatting, linting, validation, etc.

- Enable strict mTLS within the cluster by default, while leaving certain services as permissive (e.g. Kafka, RabbitMQ, etc.).

- Enable application-level TLS for all services or only services with permissive mTLS.

- Replace Grafana's built-in SQLite database with a dedicated PostgreSQL service.

- Add/update credentials for sensitive services such as Prometheus, Jaeger, etc.

- Set resource limits for services such as CPU usage, memory usage, storage usage, etc.

- Add service accounts and role-based access control for services and authentication.

- Create and run stress tests emulating real users and behavior, including end-to-end testing and an edge-case fuzzing pipeline.

- Create an ideal replication, high-availability, failover safe, globally synchronized setup for Production (unfeasible and counter-productive locally) including multi-region synchronization, eventual consistency, primary local and global writes, etc.

- Introduce database orchestration services for high-availability and replication such as PgBouncer, ZooKeeper, Patroni, CloudnativePG, etc.

- Introduce similar services that orchestrate other services such as Thanos for distributed Prometheus, etc.

- In production, introduce a CI/CD pipeline for building custom Docker images from our development environment instead of using Kind and sharing local files bidirectionally. Those images would then be pushed/pulled to/from our central registry API.

- Introduce rate limiting for each relevant service at each service layer.

- Find a way to make logs functional within the post renderer (`orchestrator/post-renderer/post_renderer.py`), as by definition it conflicts with the logger (`orchestrator/core/log.py`) since the post renderer directly manipulates data in `stdin`, `stdout`, and `stderr`.

- Improve error handling, validation, and increase coverage within the `orchestrator`.

- Introduce a domain aggregator service for aggregating database calls between BFF and DAL if they are often coupled, such as users, posts, images, etc. This is so that we can retrieve multiple related data with a single query. GraphQL might be a good fit for this.

- Update Figma designs to reflect changes I made since the first design.

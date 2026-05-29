## Imageboard (WIP)

<h3>This is a work in progress.</h3>

# Table of contents

- [Introduction](#introduction)
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
  - [Networking model](#networking-model)
  - [Namespaces](#namespaces)
- [Future plans](#future-plans)

# Introduction

Everything has been designed in Figma (subject to adjustments) since mid 2025, including the backend, frontend, and system design.

The goal was to build a large-scale global imageboard website, learn and integrate as many technologies at once as possible, all while attempting to replicate a production/real-world environment as close as possible locally.

The reusable component library (and therefore the frontend) is mostly (~90%) finished. The frontend is not 100% done because I have made the component library using Storybook, all that's left is piecing together the components in the website.

I am currently integrating the backend.

This is what the backend consists of thus far:

\- Docker and Kubernetes for containerization and service orchestration

\- A custom Python orchestrator for the entire project

\- NGINX as the external reverse proxy

\- Istio as the cluster ingress, internal API gateway and service mesh

\- Helm charts for templating, sensible defaults and deployment

\- Prometheus for metrics aggregation

\- Jaeger for tracing requests

\- Grafana for visualization

Eventually unit and end-to-end tests will be integrated as well as CI/CD tools (Jest/Vite, Cypress/Playwright, Jenkins, Argo, GitHub Actions, etc.).

I will soon integrate Kafka, Logstash, Elasticsearch, Cassandra, Sentry and Redis, then broaden the coverage of the Rest APIs for the data-access layer (DAL) and backend for frontend (BFF) services.

Some things I had planned (with production in mind) are not feasible, practical, nor reasonable locally, such as replicated pods/containers, sharding, fail-over, load balancing, worldwide server distribution, cross-region cluster synchronization, cold storage backups, CDNs, etc.
<br>Either because my machine can't handle everything or because its implementation/maintenance slows down development drastically for little to no benefit or even to detriment.
<br>In fact, my computer barely handles it right now, as it reaches 10-20GB+ RAM while idling under WSL2, which made me give up emulating many nodes with Kind, among other things.

# Prerequisites

### Tested on Ubuntu 24.04 under WSL2 in a Windows 11 host

Python: <b><i>v3.12.3</i></b>

Docker: <b><i>v29.4.0</i></b>

Kubernetes client: <b><i>v1.35</i></b>

Kind: <b><i>v0.31.0</i></b>

Helm: <b><i>v4.1.4</i></b>

<i>(Optional for creating database migrations)</i><br>
golang-migrate: <b><i>v4.19.1</i></b>

# Usage

Run `start.sh`.

Root access is required for mounting host-owned directories/files and enabling read/write from the WSL2 host on container owned directories/files.
<br>See `own_directories` in `orchestrator/core/lifecycle.py` and `fix_permissions_and_folders` in `orchestrator/core/deployment.py`.

This is because the request path flows as Host (WSL2) -> Kind -> Nodes (Kubernetes) -> Pods (Kubernetes) -> Container (Docker), where the folders are sometimes created by the user or the container and neither has read/write access over the other. Some containers also expect specific user and group ids.

This is necessary due to the unconventional and relatively complex setup where I use a hacky combination of attempting to emulate production within the same development environment, while also using and handling WSL2, Kind, local storage file mounts, persistence, permission requirements within containers (which also often reset permissions through init containers or require explicit users/permissions), etc.

In this setup permissions are shared bidirectionally in such a way that the system is practically write agnostic, which means hot-reloading works in any server that expects changes (e.g. BFF, DAL, Frontend, Storybook, etc.) whether the container itself modifies the files or I as the user modify the files from the host system. The same goes for shared files such as the Zod schemas under `contracts`.

Ideally, in a production environment you would instead use the service's VM host for persistence or a network volume.
<br>It would be preferred to build docker images for each service, using a local development environment and a CI layer for building the production/staging container image which should already include the necessary files, without the need for all of the cognitive, theoretical and practical burden that doing all of this work which synchronizing these mutually exclusive environments takes.

# User-facing endpoints

- Next.js dev server/NGINX reverse proxy: `localhost:8080`

- Storybook: `storybook.localhost:8080`

- <b>Public</b> API: `localhost:8080/api`
  - Endpoints are implemented as Rest APIs in `backend/bff/`, and they are described through:
    - Zod schemas at `contracts`
    - OpenAPI schema generated from Zod schemas at `contracts/generated/openapi.json`
    - Swagger UI as a frontend for the OpenAPI schema
  - This is exposed through a BFF (Backend for frontend) which intermediates communication with the internal API services (e.g. users-auth-dal, images-dal, etc.)

- Swagger UI: `swagger.localhost:8080`
  - Uses OpenAPI schema at `contracts/generated/openapi.json` generated from Zod schemas for the API

- Prometheus: `prometheus.localhost:8080`
  - Data persisted in its platform folder `platform/monitoring/prometheus/data`

- Grafana: `grafana.localhost:8080`
  - Data persisted in its platform folder `platform/monitoring/grafana/data`
  - User: `admin`
  - Password: `12345`

- Jaeger: `jaeger.localhost:8080`
  - Data persisted in its platform folder `platform/monitoring/jaeger/instance/data`

- Istio API gateway: `localhost:5000`

# Orchestrator

The orchestrator lives under `orchestrator`, it is a custom Python module that controls the lifecycle of the application, logging, deployment, and handling of file/folder permissions.<br>
It is controllable through a CLI, which exposes the following arguments:<br>

`up`: Starts everything<br>

`down`: Deletes everything (except persistent data)<br>

`restart`: Restarts everything (calls `down` then `up`)<br>

`--debug`: If included, more specific verbose log messages are logged to the terminal.<br>

This module is called through the following helper shell scripts:

`install.sh`: Creates a Python virtual environment for executing the orchestrator, installs the dependencies from `requirements.txt`, installs the [post renderer](#post-renderer) as a Helm plugin and enables execute permissions for `start.sh`, `stop.sh` and `restart.sh`.<br>

`start.sh`: Calls the orchestrator with the argument `up`.<br>

`stop.sh`: Calls the orchestrator with the argument `down`.<br>

`restart.sh`: Calls the orchestrator with the argument `restart`.

It loads its configuration from `orchestrator/config.py`, where some of it is hardcoded and others are loaded from the `.env`, or set to a default value if not given.

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

<br>`POST_RENDERER_CONTEXT` is also used internally for sharing the filepath of the [context](#context) file for the current service from the deployment pipeline with the [post renderer](#post-renderer), but it is not meant to be manually configured in `.env`.<br>
The orchestrator sets it for each service before calling Helm, so the [post renderer](#post-renderer) knows which generated [context.json](#context) to load.

## Lifecycle

At a high-level, this is what the orchestrator does:

0. Removes resources from potentially running app
1. Takes ownership of the app root
2. Installs node modules for the project and its workspaces (needed for development syntax validation from Zod contracts)
3. Generates an OpenAPI spec file from the Zod schemas at `contracts` to `contracts/generated/openapi.json`
4. Creates `Service` (`orchestrator/models/service.py`) and `Mount` (`orchestrator/models/mount.py`) objects from [deploy.yaml](#service-descriptor) files (this is a custom descriptor I created which will be better explained below) within any directory (except if it includes `generated` or `node_modules` in its path).
5. Writes a Kind config file from a template to mount the project files onto the cluster nodes (mounted at `/mnt` in each node)
6. Creates the Kind cluster
7. Creates the cluster namespaces
8. Sets up networking
   - Writes NGINX file `default.conf` from template and environment variables
   - Starts NGINX at given port (default `8080`) through a regular docker container
   - Deploys all Istio services
   - Starts Istio ingress at given port (default `5000`)

9. Deploys the infrastructure services with the `infra` type.
10. Deploys the storage services with the `storage` type.
11. Deploys the monitoring services with the `monitoring` type.
12. Deploys the apps services with the `apps` type.
13. If everything went as expected, then logs a success message to the terminal including the address of relevant frontend services.

Some of it is logged by default, more in-depth logs can be seen by including `--debug` in the call to `orchestrator.cli` within the shell scripts.

## Deployment

<b>All dynamically generated service deployment files, such as YAML manifests for persistent volumes, persistent volume claims, migration jobs as well as [context.json](#context), are stored in `platform/deployment/generated/${SERVICE_NAME}`, where `SERVICE_NAME` is the name of the respective service.</b>

At a high-level, this is how deployment works (mostly implemented at `orchestrator/core/deployment.py`):

1. Discovers enabled services and their configuration by parsing [service descriptors](#service-descriptor), which are named [deploy.yaml](#service-descriptor) by default.
   - The expected [service descriptor](#service-descriptor) filename can be modified through the `SERVICE_DESCRIPTOR_NAME` environment variable in `.env`.
   - Services are stored internally as `Service` objects, defined in `orchestrator/models/service.py`.
   - Mounts are stored internally as `Mount` objects, defined in `orchestrator/models/mount.py`.

2. Topologically sorts all services as a dependency graph using depth-first search, in order to first install services which others depend on and also avoid circular dependencies.

3. Fixes ownership and permissions for mount folders/files, as some services need the host, Kind nodes, Kubernetes pods and Docker containers to all be able to read/write shared paths.

4. Dynamically generates PVs (Persistent Volume), PVCs (Persistent Volume Claim) and PostgreSQL migration jobs (Job) where used, from the base templates at `platform/deployment/templates`, for each respective service.
   - Persistent mounts generate a PV/PVC pair.
   - Source mounts use a direct `hostPath`.
   - Migration jobs are generated when `migrations.enabled` is set in the [service descriptor](#service-descriptor).

5. Generates the [service context](#context) within the same generated folder. It includes metadata about the service which will be used by the [post renderer](#post-renderer) and is described in more detail below in [context](#context).

6. Calls Helm to install the service.
   - If the [service descriptor](#service-descriptor) has a `file` field, it is passed to Helm as a values override with `-f`.
   - If the [service descriptor](#service-descriptor) has `wait: true`, Helm is called with `--wait`.
   - The generated [context.json](#context) path is passed to the [post renderer](#post-renderer) through `POST_RENDERER_CONTEXT`.

7. The [post renderer](#post-renderer) intercepts the Helm installation: it ingests the unmodified documents which Helm sends to `stdin`, manipulates the manifests to inject our generated data, then outputs them to `stdout`.

8. Helm then uses the manipulated manifests from `stdout` to perform the final deployment.

9. Waits for cluster resources if given in `waitFor` (namely CRD, deployment, endpoint and/or webhook).

10. Logs success or error.

## Post Renderer

The [post renderer](#post-renderer) lives under `orchestrator/post-renderer` and is installed as a Helm plugin through `install.sh`.

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

This is why the [post renderer](#post-renderer) currently disables regular logging: writing logs to `stdout` malforms the manifests expected by Helm. I tried writing them to `stderr`, but it didn't work either, so for now I decided to comment out the logs.

## Service descriptor

The filename of a service descriptor is expected to be `deploy.yaml` by default, which can be changed through the environment variable `SERVICE_DESCRIPTOR_NAME`.

The descriptor is a small custom configuration layer. Helm still owns templating, values and installation, but `deploy.yaml` tells the orchestrator where the chart is, which service group it belongs to, which mounts need to be injected, which service dependencies must be installed first, and which extra resources must be generated before Helm finishes the deployment.

The most relevant fields are:

- `name`: Service name. This is also used for the Helm release name and for the generated folder under `platform/deployment/generated`.
- `enabled`: If `false`, the service is ignored.
- `type`: Deployment group, such as `infra`, `storage`, `monitoring`, or `apps`.
- `namespace`: Kubernetes namespace. Defaults to `DEFAULT_NAMESPACE`.
- `chart`: Helm chart path.
- `file`: Optional values file passed to Helm with `-f`.
- `dependsOn`: Other service names that must be deployed first.
- `mounts`: Source or persistent mounts that the [post renderer](#post-renderer) injects into the rendered manifests.
- `migrations`: Optional database migration job configuration.
- `wait`: Whether Helm should wait for the release.
- `waitFor`: Additional cluster resources the orchestrator should wait for after Helm finishes.

<br>These are the accepted path formats for `chart` and `file`:

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

- `serviceName`: Name of the service being deployed.
- `serviceType`: Service group/type, such as `infra`, `storage`, `monitoring`, or `apps`.
- `generatedDir`: Absolute path to the generated folder for that service.
- `documents`: Generated manifests related to the service, such as PVs, PVCs and migration Jobs.
- `mounts`: Mount metadata used by the [post renderer](#post-renderer).

Each mount includes the original host path, the Kind path under `/mnt`, the container path, whether it is read-only, the generated volume name, and the Kubernetes volume source to inject.

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

## Networking model

Connection is meant to mirror a real-world pathway. Thus, I have separated it in two layers:

1. External: What the end user sees - public facing extra-cluster edge server.
   - This is the first barrier of entry, where a public facing NGINX server runs, behaving as a load balancer/reverse proxy.
   - As such, my approach was to run it directly in the host machine through a docker container - extra-cluster.
   - However, this is not where the request stops, as NGINX proxies it to the Istio ingress in the cluster (which is why Istio is also exposed through port-forwarding)

2. Internal: What the user doesn't see - the cluster itself and internal services.
   - This is where the request from NGINX arrives in the cluster, at the cluster edge through Istio as an API gateway.
   - Istio also acts as a service mesh, so it is also responsible for (through Envoy sidecars) handling inter-service communication.

This distinction is important as although you can access these services externally due to proxy routing and redirection at the aforementioned addresses and ports, this is not where or how service inter-communication and direct calls to services happen (only indirectly).

Internally, services have their own names and ports, likely distinct from those exposed to the users, and like in a real-world scenario, as a user which has access to these public facing services/interfaces, you cannot directly query them without being part of the cluster (which the services themselves are, but NGINX isn't, and neither are you, unless you enter the pods/containers and/or execute commands from within).

All that to say: The service names and ports are (most of the time) different intra-cluster from those I've listed, and are not directly accessible.

You can only access them directly through `kubectl run` or `kubectl exec`, through proxying `platform/networking/istio/istio-ingress-cfg/chart/templates/routing_table.yaml`, or by querying from another service within the cluster itself, through `app-svc:svc-port` (if on the same namespace) or `app-svc.namespace.svc.cluster.local` from any namespace.

## Namespaces

| Namespace    | Description                                                                   |
| :----------- | :---------------------------------------------------------------------------- |
| cert-manager | Where cert-manager lives.                                                     |
| istio-system | Where all Istio deployments go, including the ingress.                        |
| monitoring   | Where all monitoring services live, such as Prometheus, Grafana, Jaeger, etc. |
| databases    | Where all database services live, such as PostgreSQL, Redis, Cassandra, etc.  |
| apps         | Where applications live, such as the frontend, Swagger UI, BFF, DAL, etc.     |

# Future plans

- Migrate internal APIs to gRPC (e.g. DAL). Only use Rest APIs for public facing services (e.g. BFF).

- Central registry API for push/pulling data shared by services such as custom Docker images, NPM packges, AI model versioning, etc.

- Turn `contracts` into a standalone NPM package registered in our central API registry.

- Give more descriptive error messages in data-access layer API responses from Zod validation (restrict some of this in the BFF to avoid unnecessarily leaking internals). E.g.: "Password too short", "Username too long", etc.

- Create job(s) for periodically dumping databases (e.g. `pg_dump` users_auth from users-auth-postgres).

- Unit and end-to-end testing using Jest/Vite and Cypress/Playwright.

- Create database/API tests (e.g. is it responding? are the responses formatted correctly? are return codes correct?)

- Integrate Sentry for error tracking.

- Make a setup installation pipeline which installs all project dependencies, including binaries such as Helm, Kubernetes, etc.

- Pre-commit hooks for formatting, linting, etc.

- CI/CD tools such as Jenkins, Argo, Terraform, etc.

- Enable strict mTLS within the cluster by default, while leaving certain services as permissive (e.g. Kafka, RabbitMQ, etc.).

- Enable application-level TLS for all services or only services with permissive mTLS.

- Replace Grafana's built-in MySQL database with a dedicated PostgreSQL service.

- Add/update credentials for sensitive services such as Prometheus, Jaeger, etc.

- Set resource limits for services (e.g. CPU usage, memory usage, storage usage, etc.)

- Add service accounts and role-based access control for services and authentication.

- Create and run stress tests emulating real users and behavior, including end-to-end testing and an edge-case fuzzing pipeline.

- Create an ideal replication, high-availability, fail-over safe, globally synchronized setup for Production (unfeasible and counter-productive locally) including multi-region synchronization, eventual consistency, primary local and global writes, etc.

- Introduce database orchestration services for high-availability, replication, etc. such as PgBouncer, Zookeper, Patroni, CloudnativePG, etc.

- Also introduce similar services that orchestrate other services such as Thanos for distributed Prometheus, etc.

- In production, introduce a CI/CD pipeline for building custom docker images from our development environment instead of using Kind and sharing local files bidirectionally. Those images would then be push/pulled to/from our central registry API.

- Introduce rate limiting for each relevant service at each service layer.

- Find a way to make logs functional within the post renderer (`orchestrator/post-renderer/post_renderer.py`), as by definition it conflicts with our logger (`orchestrator/core/log.py`) since the post renderer directly manipulates data in stdin/stdout/stderr.

- Improve error handling, validation, and increase coverage within the `orchestrator`.

- Introduce domain aggregator service for aggregating database calls in between BFF and DAL if they are often coupled (e.g. users, posts, images, etc.). This is so that we can retrieve multiple related data with a single query. Maybe GraphQL might be good for this.

- Update Figma designs to reflect changes I made since.

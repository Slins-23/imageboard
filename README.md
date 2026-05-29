# Imageboard (WIP)

<h3>This is a work in progress.</h3>

## Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [User-facing endpoints](#user-facing-endpoints)
- [Orchestrator](#orchestrator)
- [Notes](#notes)

## Introduction

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

## Prerequisites

### Tested on Ubuntu 24.04 under WSL2 in a Windows 11 host

Python: <b><i>v3.12.3</i></b>

Docker: <b><i>v29.4.0</i></b>

Kubernetes client: <b><i>v1.35</i></b>

Kind: <b><i>v0.31.0</i></b>

Helm: <b><i>v4.1.4</i></b>

<i>(Optional for creating database migrations)</i><br>
golang-migrate: <b><i>v4.19.1</i></b>

## Usage

Run `start.sh`.

Root access is required for mounting host-owned directories/files and enabling read/write from the WSL2 host on container owned directories/files.
<br>See `own_directories` in `orchestrator/core/lifecycle.py` and `fix_permissions_and_folders` in `orchestrator/core/deployment.py`.

This is because the request path flows as Host (WSL2) -> Kind -> Nodes (Kubernetes) -> Pods (Kubernetes) -> Container (Docker), where the folders are sometimes created by the user or the container and neither has read/write access over the other. Some containers also expect specific user and group ids.

This is necessary due to the unconventional and relatively complex setup where I use a hacky combination of attempting to emulate production within the same development environment, while also using and handling WSL2, Kind, local storage file mounts, persistence, permission requirements within containers (which also often reset permissions through init containers or require explicit users/permissions), etc.

In this setup permissions are shared bidirectionally in such a way that the system is practically write agnostic, which means hot-reloading works in any server that expects changes (e.g. BFF, DAL, Frontend, Storybook, etc.) whether the container itself modifies the files or I as the user modify the files from the host system. The same goes for shared files such as the Zod schemas under `contracts`.

Ideally, in a production environment you would instead use the service's VM host for persistence or a network volume.
<br>It would be preferred to build docker images for each service, using a local development environment and a CI layer for building the production/staging container image which should already include the necessary files, without the need for all of the cognitive, theoretical and practical burden that doing all of this work which synchronizing these mutually exclusive environments takes.

## User-facing endpoints

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

## Orchestrator

The orchestrator lives under `orchestrator`, it is a Python module written in Python that controls the lifecycle of the application, logging, deployment, and handling of file/folder permissions.<br>
It is controllable through a CLI, which exposes the following arguments:<br>

`up`: Starts everything<br>

`down`: Deletes everything (except persistent data)<br>

`restart`: Restarts everything (calls `down` then `up`)<br>

`--debug`: If included, more specific verbose log messages are logged to the terminal.<br>

This module is called through the following helper shell scripts:

`install.sh`: Creates a Python virtual environment for executing the orchestrator, installs the dependencies from `requirements.txt`, installs the post renderer as a Helm plugin and enables execute permissions for `start.sh`, `stop.sh` and `restart.sh`.<br>

`start.sh`: Calls the orchestrator with the argument `up`.<br>

`stop.sh`: Calls the orchestrator with the argument `down`.<br>

`restart.sh`: Calls the orchestrator with the argument `restart`.

It loads its configuration from `orchestrator/config.py`, where some of it is hardcoded and others are loaded from the `.env`, or set to a default value if not given.

This orchestrator does a lot of things (some of it is logged by default, more in-depth logs can be seen by including `--debug` in the call to `orchestrator.cli` within the shell scripts):

1. Takes ownership of the app root
2. Installs node modules for the project and its workspaces
3. Generates an OpenAPI spec file from the Zod schemas at `contracts` to `contracts/generated/openapi.json`
4. Creates `Service` objects from `deploy.yaml` files (this is a custom descriptor I created which will be better explained below) found within any directory (except if it includes `generated` or `node_modules` in its path).
5. Writes a Kind config file from a template to mount the project files onto the cluster nodes
6. Creates the Kind cluster
7. Creates the cluster namespaces
8. Sets up networking
   - Writes NGINX file `default.conf` from template and environment variables
   - Starts NGINX at given port (default `8080`) through a regular docker container
   - Deploys all Istio services
   - Starts Istio ingress at given port (default `5000`)

9. Deploys the infrastructure services through the `infra` scope.
10. Deploys the storage services through the `storage` scope.
11. Deploys the monitoring services through the `monitoring` scope.
12. Deploys the apps services through the `apps` scope.
13. If everything went as expected, then logs a success message to the terminal including the address of user-facing services.

## Notes

Some relevant data can be modified through the `.env` file, such as the ports for the Next.js dev server/NGINX reverse proxy, Istio ingress, etc.

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

### Namespaces

<b>cert-manager</b>: Where cert-manager lives.

<b>istio-system</b>: Where all Istio deployments go, including the ingress.

<b>monitoring</b>: Where all monitoring services live, such as Prometheus, Grafana, Jaeger, etc.

<b>databases</b>: Where all database services live, such as PostgreSQL, Redis, Cassandra, etc.

<b>apps</b>: Where applications live, such as the frontend, Swagger UI, BFF, DAL, etc.

## Future plans

- Migrate internal APIs to gRPC (e.g. DAL). Only use Rest APIs for public facing services (e.g. BFF).

- Central registry API for push/pulling data shared by services such as custom Docker images, NPM packges, AI model versioning, etc.

- Turn `contracts` into a standalone NPM package registered in our central API registry.

- Give more descriptive error messages in data-access layer API responses from databases (restrict some of this in the BFF to avoid unnecessarily leaking internals). E.g.: "Password too short", "Username too long", etc.

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

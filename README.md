



# Imageboard

A full-stack large-scale imageboard platform and application, mirroring production locally as close as possible.

The tech stack so far: A custom Python orchestrator, TypeScript, Next.js, Storybook, Node/Express services, shared Zod contracts, generated OpenAPI docs, PostgreSQL, Kubernetes, Kind, Helm, Istio, NGINX, Prometheus, Grafana, Jaeger.

I plan to soon integrate Redis, Kafka, Cassandra, Elasticsearch, Logstash, and Sentry, then eventually CI/CD tools alongside testing.

This is how the project evolved:

`Figma System/backend design reference -> Figma Frontend design reference -> Frontend implementation -> Backend implementation`

The Figma design for the frontend covers the entire application and is feature-complete, including almost all different pages and states.

The backend design includes all databases, schemas, more services I plan to integrate and many implementation notes, while some of it changed upon implementation, its core remains the same.

The frontend implementation for the reusable component library is mostly finished, what's left is wiring everything together based on the frontend design reference for the frontend itself.

The backend implementation has been my focus lately.

> Work in progress: the component library and platform/orchestration are mostly done, current focus is on the backend and eventually frontend wiring.

# Table of contents

- [Showcase](#showcase)
  - [Orchestrator](#orchestrator)
    - [Installation and startup](#installation-and-startup)
  - [Services](#services)
    - [Frontend](#frontend)
      - [Design reference](#design-reference)
      - [Reusable component library](#reusable-component-library)
      - [Application](#application)
    - [Public API](#public-api)
    - [Monitoring](#monitoring)
  - [System/backend design reference](#systembackend-design-reference)
- [Introduction](#introduction)
- [Architecture](#architecture)
  - [Tech stack](#tech-stack)
  - [Project structure](#project-structure)
  - [Namespaces](#namespaces)
  - [Frontend, component library and design philosophy](#frontend-component-library-and-design-philosophy)
  - [Database domains](#database-domains)
  - [Contracts](#contracts)
  - [Networking model](#networking-model)
  - [Local storage and permissions](#local-storage-and-permissions)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [User-facing endpoints](#user-facing-endpoints)
- [Orchestrator](#orchestrator-1)
  - [Environment variables](#environment-variables)
  - [Lifecycle](#lifecycle)
  - [Deployment](#deployment)
  - [Service descriptor](#service-descriptor)
  - [Context](#context)
  - [Post Renderer](#post-renderer)
- [Future plans](#future-plans)
  - [Frontend](#frontend)
  - [Backend and contracts](#backend-and-contracts)
  - [Platform](#platform)
  - [Production](#production)

# Showcase

> Note: All videos are heavily compressed, sped up, and edited to stay under GitHub's 10MB upload limit.
> <br>Full-quality references are available in the Figma links, the screenshots below, or you can run the application locally.

## Orchestrator

### Installation and startup

[orchestrator](https://github.com/user-attachments/assets/81062016-2c8b-4b9d-ace9-ce3c77e34bd5)

## Services

### Frontend

#### Design reference

> This was made as an early design reference.
> <br>The frontend design is mostly up to date with the current implementation, and contains the entire planned frontend.

URL: https://www.figma.com/design/0T3UGwiZtPdJiPpDhgFCmf/Homepage?node-id=22-2&t=b0YfpkwNYqBQAepM-1

[figma_frontend](https://github.com/user-attachments/assets/a1016428-0b0a-43ae-bda1-9f899c71da12)

#### Reusable component library

> All "errors" are intentional and expected behavior for testing scenarios.

> Some component story interactions intentionally succeed or fail at random (50% each) to demonstrate debouncing on repeated like/dislike taps, client-state rollback on server-side errors, error and edge-case handling, and tooltips that update based on the interaction outcome.

<br>

<img width="2558" height="1242" alt="storybook" src="https://github.com/user-attachments/assets/a8d001ba-96f0-481c-b76d-dc5997152b28" />

<br>

[storybook](https://github.com/user-attachments/assets/3bbba5eb-ee97-40f0-862f-e3089cf44c8b)

#### Application

[frontend](https://github.com/user-attachments/assets/79c3c508-c6af-4e93-9b13-26724f2a4125)

### Public API

[public_api](https://github.com/user-attachments/assets/cfdf9fe4-5540-4dee-be78-a341a8737faf)

### Monitoring

[monitoring](https://github.com/user-attachments/assets/cef6212b-3a6e-4008-9f99-a12f240f5e27)

## System/backend design reference

> This was made almost 1 year ago, as a design reference.
> <br>The backend/system design differs in some areas from the current implementation, such as missing certain services I later implemented, the orchestrator itself, not yet implemented databases, and changes to parts of the request flow.

URL: https://www.figma.com/design/0T3UGwiZtPdJiPpDhgFCmf/Homepage?node-id=2-37&t=2CoUf9Zsl0qgkKSw-1

[figma_backend](https://github.com/user-attachments/assets/0c1cf626-5c35-49d0-a67e-8b9c7545f173)

# Introduction

The goal is to build a large-scale global imageboard website, learn and integrate as many technologies at once as possible, all while attempting to replicate a production/real-world environment as close as possible locally.

Everything has been mostly designed in Figma (as a reference and subject to adjustments in the implementation) since mid 2025, including the backend/system and frontend.

Frontend Figma reference: https://www.figma.com/design/0T3UGwiZtPdJiPpDhgFCmf/Homepage?node-id=22-2&t=b0YfpkwNYqBQAepM-1

Backend/System Figma reference: https://www.figma.com/design/0T3UGwiZtPdJiPpDhgFCmf/Homepage?node-id=2-37&t=2CoUf9Zsl0qgkKSw-1

These links are references mostly made 1 year ago. The frontend implementation is mostly the same, while the backend/system design has changed a little in some areas (though the core idea remains the same).

The reusable component library (and therefore most of the frontend) is mostly finished. As I have made it using Storybook, all that's left is wiring together the components into pages for the website and connecting to the backend.

The frontend's focus is mainly on the images.

My goal is for the application to be interactive and engaging, simple, intuitive, and lightweight, which is what the average user wants, while also being customizable for those who want a more personalized experience.
<br>As the average user doesn't bother with too much customization, I decided to hide most of them by default in the homepage, where the user can open them by checking the "Display tags, filters, and preferences" box.

The following reference designs illustrate the idea behind the significance of customization and filtering features.

<img width="2277" height="231" alt="filter_c" src="https://github.com/user-attachments/assets/787292bc-86f1-480d-8645-5e94d0ec83fe" />
<br>
<img width="150px" height="auto" alt="filter_b" src="https://github.com/user-attachments/assets/fd7e5475-f415-4b57-90e5-13a347f1abcc" />
<br>
<img width="600px" height="auto" alt="filter_a" src="https://github.com/user-attachments/assets/481e2081-efa1-4aaf-b326-c5414f45fd34" />

<br>
It was developed desktop-first, but with mobile in mind as well, having a notification system in the plans (which will eventually include mobile push notifications), including a feed-like swipe mode, clearly visible and separated icons to avoid tapping the same one on accident (as taps on a phone are less precise than a mouse pointer), etc.

<br>A core area of the application will be eventually auto-tagging images on upload using AI models, then also creating a recommendation algorithm based on how much a user engages with posts that have certain tags.
<br>Another interesting feature will be grouping/searching images by color palette.
<br>On a related note, the user is also be able to, in real-time, arbitrarily pick theme colors for the application through a custom theme picker at the bottom right corner, as I purposefully used 4 color variants throughout the entire application (namely `--primary`, `--secondary`, `--tertiary`, and `--accent`).
<br>I also plan to create an advanced filter for searching/filtering through images that is highly customizable and allows very specific searching and sorting from metadata.

My current priority is the backend.

This is what the backend consists of thus far:

\- Docker and Kubernetes for containerization and service orchestration

\- Kind for creating and running the Kubernetes cluster locally

\- Helm charts for templating, sensible defaults and deployment

\- A custom Python orchestrator for controlling the project, logging, and dynamically manipulating manifests

\- NGINX as the external reverse proxy

\- Istio as the cluster ingress, internal API gateway and service mesh

\- Zod contracts shared between services

\- OpenAPI spec generation from Zod contracts

\- Swagger UI using the generated OpenAPI schema for API documentation

\- Prometheus for metrics aggregation

\- Grafana for visualization

\- Jaeger for tracing requests

\- PostgreSQL databases

Some things I had planned with production in mind are not feasible, practical, or reasonable locally, such as replicated pods/containers, sharding, failover, load balancing, worldwide server distribution, cross-region cluster synchronization, cold storage backups, CDNs, etc.
<br>This is either because my machine can't handle everything or because the implementation/maintenance slows development down drastically for little to no benefit, or even to detriment.
<br>In fact, my computer barely handles it right now, as it reaches 10-20GB+ RAM while idling under WSL2, which made me give up emulating many nodes with Kind, among other things.

That is to say, in this project I tried to emulate a large production environment as close as possible without making extreme or unreasonable compromises.

The general idea is:

1. The frontend is an application made alongside a reusable component library, with TypeScript, Next.js, and Storybook.
2. Public API calls go through BFF (Backend for Frontend) services.
3. Shared Zod contracts live under `contracts` and are used to validate requests and generate OpenAPI documentation.
4. BFF services communicate with internal services such as data-access layer and/or others.
5. These services then perform internal actions, such as the data-access layer services which communicate with databases to retrieve query data.
6. The whole environment is deployed locally through Kubernetes, Helm, Istio, NGINX, and the custom orchestrator.

I tried to emulate a real production request flow as close as possible:

`Client browser -> NGINX -> Istio ingress gateway -> Kubernetes services -> BFF/DAL/database`

This makes the local setup overly complex compared to a normal development or even production environment, but that also means the project deals with many of the real-world challenges a real system would have and more: external routing, internal service communication, service discovery, generated API documentation, shared contracts, persistent storage, observability, deployment ordering, orchestration, permissions
across host/container boundaries, etc.

# Architecture

> Some relevant data can be modified through the `.env` file, such as the ports for the NGINX reverse proxy/Frontend Next.js dev server, Istio ingress, etc. More info on the [Environment variables](#environment-variables) section.

## Tech stack

| Type          | Technology                         | Usage                                                                        |
| :------------ | :--------------------------------- | :--------------------------------------------------------------------------- |
| Frontend      | TypeScript, Jest, Node.js, Next.js | Frontend application                                                         |
| Frontend      | Storybook                          | Component library development and testing                                    |
| Frontend      | CSS Modules                        | Used everywhere besides global styling                                       |
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

## Project structure

| Path                          | Description                                                                                             |
| :---------------------------- | :------------------------------------------------------------------------------------------------------ |
| frontend                      | Frontend service descriptor and values                                                                  |
| frontend/src                  | Frontend project including component library and Storybook stories                                      |
| frontend/src/src              | Frontend source code                                                                                    |
| frontend/src/src/components   | Reusable component library                                                                              |
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
| install.sh                    | Helper shell script for installing the [orchestrator](#orchestrator-1)                                  |

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

## Frontend, component library and design philosophy

You can see the Figma reference for the frontend here: https://www.figma.com/design/0T3UGwiZtPdJiPpDhgFCmf/Homepage?node-id=22-2&t=b0YfpkwNYqBQAepM-1

It includes pages and states for the homepage/imageboard, focused image/swipe mode, tags, filters, albums, comments, authentication, profile/settings, messages, notifications, create post, upload states, success/failure states, multiple hover/active/error states, etc.

My goal is for the application to be interactive, engaging, simple, intuitive, and lightweight, which is what the average user wants, while also being customizable for those who want a more personalized experience.
As the average user doesn't bother with too much customization and it may clutter the interface, I decided to hide most of it by default in the homepage, where the user can open them by checking the "Display tags, filters, and preferences" box.

It was developed desktop-first, but with mobile in mind as well, having a notification system in the plans (which will eventually include mobile push notifications), including a feed-like swipe mode, clearly visible and separated icons to avoid tapping the same one on accident (as taps on a phone are less precise than a mouse pointer), etc.

I decided to implement the frontend component-first instead of hardcoding every page at once.

The reusable component library lives under `frontend/src/src/components` and was developed with TypeScript and Next.js, using Storybook so they can be tested in isolation before being integrated into the final Next.js pages.
<br>This includes buttons, icon buttons, text inputs, text areas, checkboxes, radio groups, toggles, dropdowns, modals, login/signup dialogs, album selection, comments overlay, post tags, create post states, linked accounts, notification counters, user placeholders, and other reusable UI pieces.

Most components are flexible, composable, and easily extensible, while also allowing for controlled and uncontrolled behavior.

Some component stories also intentionally test unsuccessful interaction states and some edge-cases as well.
<br>I use those states to test behavior such as debounce (when the user spams the same button such as like/dislike), reverting state from unsuccessful actions on the server-side, successful/failed actions, different tooltip messages, and other edge cases.
<br>Due to this, errors can be ignored on the showcase videos as they're intentional and expected, often having a 50% chance of success or failure for a given action.

The `ThemePicker` and `CommentsOverlay` components are a work in progress.
<br>The `ThemePicker` lets the user change the app colors through its variables in real-time. It mostly works already, but this is not its final design and it's also missing some functionality.
<br>It is meant to be available in all pages and opened from clicking/tapping the icon in the bottom-right corner of the app.
<br>The current implementation is not persistent yet, but the future plan is to add reset/save/cancel behavior, allowing resetting the colors to the original palette, caching the current color palette in the user's browser, and potentially eventually coupling that to the user's account so they always have the same color palette from anywhere.

## Database domains

System/backend Figma design reference: https://www.figma.com/design/0T3UGwiZtPdJiPpDhgFCmf/Homepage?node-id=2-37&t=2CoUf9Zsl0qgkKSw-1

You can see all database schemas, as well as potential solutions/approaches to some of the bottlenecks and/or problems I could foresee with the design (especially at scale) on the system/backend Figma design above, or on its showcase video.

> These databases and their schemas were planned before I had ever worked with any of these databases, let alone started implementing anything, so expect the field types of some of them to be pseudocode placeholders.

These are the planned database domains (not the same as schemas, this is essentially a "grouping" by behavior):

| Domain               | Use case                                                                                                                                      |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Users                | Credentials (authentication data) and personally identifiable information.                                                                    |
| Profiles             | Public and private profile data, and related engagement data such as profile views, follows, etc.                                             |
| Images               | Image metadata, ownership, dimensions, generated variants, blurhash/thumbnail/original references, and storage/cache strategy.                |
| Posts                | User-facing post data and relationships between users, posts, images, tags, comments, and related engagement data such as views and likes.    |
| Comments/replies     | Comments, comment/reply relationship, and related engagement metadata such as likes.                                                          |
| Albums               | User-created collections of posts/images.                                                                                                     |
| Tags/interests       | Image tags, user interests, and recommendation weights.                                                                                       |
| Preferences/settings | User settings and personalization such as notification preferences, feed layout, UI language, post/profile visibility, profile settings, etc. |
| Central registry     | Exposes data as the shared global source of truth shared, such as the metadata regarding AI models, countries, languages, etc.                |

<br>The planned AI tagging flow would tag images on upload.
<br>Those tags would later be used in the recommendation system, where whenever a user engages with posts containing a given tag, that user's interest in the tag increases.
<br>The recommendation engine would then weight that proportionally for the feed and the `Recommended` filter.

There is also a planned optional color-palette search/grouping feature.
<br>The idea is that images can be searched and/or grouped by color palette, where if only grouping (not searching), the ones that match the color palette the most are re-ordered to the top-left of the imageboard.
<br>When searching, color similarity weights can also be weighted with the recommendation weights.

## Contracts

The project uses shared Zod contracts which are defined under `contracts` and used across multiple services.

The idea is for the API shape to be described once through Zod schemas, then used where possible such as the BFF services, DAL services, generating OpenAPI documentation, and also eventually the frontend.

This is relevant because otherwise the frontend, backend, and API documentation would easily drift apart as there would be no single source of truth, while also resulting in a lot of redundant code duplication, making it much harder to maintain, scale, validate, etc.

The frontend currently has some legacy local types under `frontend/src/src/types`, but I will eventually migrate them to use Zod contracts instead for any API related work (unless they are used for mock UI testing/prototyping).

The project also generates an OpenAPI schema at `contracts/generated/openapi.json` everytime it starts through the `orchestrator up` command, which is what Swagger UI uses.

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

Run `install.sh` once, then call the [orchestrator](#orchestrator-1) through the `orchestrator` command.

```bash
./install.sh
orchestrator up
```

See [orchestrator](#orchestrator-1) for information on the available commands and options.

There is no need to reinstall when changes are made to the orchestrator, they are automatically accounted for.

# User-facing endpoints

> Everything below assumes default settings.

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
| SERVICE_DESCRIPTOR_NAME  | deploy.yaml |
| DEFAULT_NAMESPACE        | default     |
| NGINX_PORT               | 8080        |
| ISTIO_PORT               | 5000        |
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

> Some of this is logged by default. More in-depth logs can be seen by including the `--debug` option in the call to `orchestrator`.

## Deployment

> <b>All dynamically generated service deployment files, such as YAML manifests for persistent volumes, persistent volume claims, migration jobs as well as [context.json](#context), are stored in `platform/deployment/generated/${SERVICE_NAME}`, where `SERVICE_NAME` is the name of the respective service.</b>

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

# Future plans

### Frontend

- Finish theme picker component, make it draggable, implement save, cancel and reset state behavior.
- Finish `CommentsOverlay` component.
- Make all font size variables relative to the medium font size variable in `globals.css`, so that scaling the medium font size automatically scales all variants (independent of the operating system and browser's settings).
- Add a font size selector component as well for the entire application.
- Create a sidebar comments component for full-screen posts (same as `CommentsOverlay` but opens/closes from the side).
- Finish wiring the pages together from the existing component library.
- Improve cross-browser consistency (mostly developed and tested on Firefox)
- Review which pages/components truly need `"use client"`.
- Connect to the backend APIs.
- Introduce application-level client-side and server-side state management through Zustand and Tanstack Query.
- Improve responsiveness across multiple devices, screens, and dimensions.
- Add unit and end-to-end tests.

### Backend and contracts

- Implement AI image tagging on upload.
- Implement recommendation/interest tracking based on user engagement with posts that contain specific tags.
- Implement color coding/search/grouping algorithm for images matching a given color palette, optionally mixing color similarity weights with recommendation weights.
- Migrate internal APIs to gRPC where applicable, such as DAL services. Use REST APIs only for public-facing services such as BFF services.
- Give more descriptive validation error messages in data-access layer API responses such as "Password too short", "Username too long", etc. from Zod validation, while avoiding leaking this internal information from the BFF to the public users in certain scenarios.
- Broaden the REST API coverage for the current and future BFF and DAL services.
- Turn `contracts` into a standalone NPM package registered in a central registry API.
- Introduce a domain aggregator service for aggregating, for example, database calls between BFF and DAL if they are often coupled such as users, posts, images, etc. This is so that we can retrieve multiple related data with a single query. GraphQL might be a good fit for this.

### Platform

- Integrate Redis, Kafka, Cassandra, Elasticsearch, Logstash, and Sentry.
- Add CI/CD tools such as GitHub Actions, Jenkins, Argo, Terraform, etc.
- Add pre-commit hooks for formatting, linting, validation, etc.
- Add stress, unit, and end-to-end tests using Jest/Vitest, Cypress/Playwright, and tools such as Locust/k6/wrk, etc.
- Create jobs for periodically dumping databases (e.g. `pg_dump` `users_auth` from `users-auth-postgres`).
- Create a central registry API for push/pulling data shared by services such as custom Docker images, NPM packages, AI model versioning, etc.
- Integrate the central registry API with the CI/CD setup to automatically build files, making most file mounts unnecessary (the containers would already contain them built-in).
- Create database/API tests, such as checking whether services are responding, returning correctly formatted responses, and using correct status codes.
- Improve install script (`install.sh`) coverage to also install all project dependencies, including binaries from Helm, Kubernetes, etc.
- Find a way to make logs functional within the post renderer (`orchestrator/post-renderer/post_renderer.py`), as by definition it conflicts with the logger (`orchestrator/core/log.py`) since the post renderer directly manipulates data in `stdin`, `stdout`, and `stderr`.
- Improve error handling, validation, and coverage within the [orchestrator](#orchestrator-1).
- Improve code documentation through commenting and annotating functions, using specs such as TSDoc.

### Production

- Enable strict mTLS within the cluster by default, while leaving certain services as permissive (e.g. Kafka, RabbitMQ, etc.).
- Enable application-level TLS for all services or only services with permissive mTLS.
- Add/update credentials for sensitive services such as Prometheus, Jaeger, etc.
- Add service accounts and role-based access control for services and authentication.
- Set resource limits for services such as CPU usage, memory usage, storage usage, etc.
- Introduce rate limiting for each relevant service at each service layer.
- Create an ideal failover safe setup with replication, high-availability and global synchronization, including multi-region synchronization, eventual consistency, primary local and global writes, etc.
- Introduce database orchestration services for high-availability and replication such as PgBouncer, ZooKeeper, Patroni, CloudnativePG, etc.
- Introduce distributed monitoring orchestrators, such as Thanos for Prometheus.
- Replace Grafana's built-in SQLite database with a dedicated PostgreSQL service.

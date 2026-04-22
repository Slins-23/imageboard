# Imageboard (WIP)

<h3>This is a work in progress.</h3>

## Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Notes](#notes)

## Introduction

Everything has been designed in Figma (subject to adjustments) for ~7-8 months. This includes the backend, frontend, and system architecture.

The goal was to build a large-scale global imageboard website, use and learn as many technologies as possible, all while attempting to replicate a production/real-world environment as close as possible.

The reusable component library (and therefore the frontend) is mostly (~90%) finished. They aren't entirely glued together yet as I made it with Storybook.

I started integrating the backend this week (~04/10).

I have already integrated Docker and Kubernetes for containerization and orchestration, NGINX as the external reverse proxy, Istio as the internal API gateway and service mesh, Helm charts for templating and sensible chart defaults, Prometheus for aggregation, Jaeger for tracing, and Grafana for visualization.

My plan is to adapt their settings to more production ready as the need arises, complexity increases, everything else is stable, and assuming I can reasonably do so without drastically slowing down my workflow. The same goes for unit (e.g. Jest/Vite) and integration (e.g. Cypress) testing, as well as CI/CD (e.g. Jenkins, Argo, GitHub actions).

I am soon to integrate Kafka, Logstash, Elasticsearch, PostgreSQL, Cassandra, and Redis. Then later down the line Zod, API endpoints, security measures, and many other things.

Some things I planned on in the design are not feasible in my local machine, such as replicated pods/containers, sharding, fail-over, load balancing, worldwide server distribution, cross-region cluster synchronization, cold storage backups, CDNs, etc. Either because it's physically impossible or my single machine can't handle everything.
In fact, it barely handles it right now, reaching 10-20GB+ RAM by itself under WSL2, which made me give up emulating many nodes with Kind.

Some things can only stay on paper, or Figma and my mind I guess. Though it wasn't all for nothing as I learned a lot at the time.

## Prerequisites

#### (Tested on Ubuntu 24.04 under WSL2 in a Windows 11 host)

Kubernetes client: <b><i>v1.35</i></b>

Kind: <b><i>v0.31.0</i></b>

Helm: <b><i>v4.1.4</i></b>

## Usage

CD into `backend` and run `start.sh` in the root directory (<b>MUST</b>, for now).

## Relevant user-facing services

- Next.js dev server/NGINX reverse proxy: `localhost:8080`

- Storybook: `storybook.localhost:8080`

- Prometheus: `prometheus.localhost:8080`
  - Data persisted in `backend/data/prometheus`

- Grafana: `grafana.localhost:8080`
  - Data persisted in `backend/data/grafana`
  - User: `admin`
  - Password: `12345`

- Jaeger: `jaeger.localhost:8080`
  - No data persistence for now
  - Currently has a startup websocket problem, sometimes it works sometimes it doesn't

- Istio API gateway: `localhost:5000`

## Notes

Ports for Next.js dev server/NGINX reverse proxy and Istio ingress can be modified within `backend/start.sh`.

Connection is meant to mirror a real-world pathway. Thus, I have separated it in two layers:

1. External: What the end user sees - public facing extra-cluster edge server.
   - This is the first barrier of entry, where a public facing NGINX server runs, behaving as a load balancer/reverse proxy.
   - As such, my approach was to run it directly in the host machine through a docker container - extra-cluster.
   - However, this is not where the request stops, as NGINX proxies it to the Istio ingress in the cluster (which is why Istio is also exposed through port-forwarding)

2. Internal: What the user doesn't see - the cluster itself and internal services.
   - This is where the request from NGINX arrives in the cluster, at the cluster edge through Istio as an API gateway.
   - Istio also acts as a service mesh, so it is also responsible for (through Envoy sidecars) handling inter-service communication.

This distinction is important as although you can access these services externally due to proxy routing and redirection at the aforementioned addresses and ports, this is not where or how service inter-communication and direct calls to services happen (only indirectly).

Internally, services have their own names and ports, likely distinct from those exposed to the users, and like in a real-world scenario, as a user which has access to these public facing services/interfaces, you cannot directly query them without being part of the cluster (which the services themselves are, but NGINX isn't, and neither are you).

All that to say: The service names and ports are different intra-cluster from those I've listed, and are not directly accessible.

You can only access them directly through `kubectl exec`, through proxying `backend/charts/istio-ingress-cfg/routing_table.yaml`, or by querying from another service within the cluster itself, through `app-svc:svc-port` (if on the same namespace) or `app-svc.namespace.svc.cluster.local` in any.

At this point you could run `kubectl get svc --all-namespaces` to check them out.

You can see and/or modify the Istio API gateway routing table I defined at `backend/charts/istio-ingress-cfg/templates/routing_table.yaml`.

export BACKEND_DIR="$(pwd)"
export NGINX_PROXY_PORT=8080
export ISTIO_INGRESS_PORT=5000
export BASE_POSTGRESQL_DIR="data/postgresql"

sudo chown -R $(id -u):$(id -g) apps data

npm install

envsubst < kind/cluster-cfg.template.yaml > kind/cluster-cfg.yaml
envsubst < nginx/default.template.conf > nginx/default.conf
#envsubst < scripts/start_istio.sh.template > scripts/start_istio.sh

./scripts/bootstrap.sh

# Create Kind cluster
./scripts/create_cluster.sh

# Create namespaces (e.g. istio-system, databases, etc.)
./scripts/create_namespaces.sh

# Start cert-manager (manages intra-cluster TLS certificates)
./scripts/start_certmanager.sh

# Start databases
./scripts/start_databases.sh

# Starts monitoring services (e.g. Jaeger, Prometheus, Grafana, etc.)
./scripts/start_monitoring.sh

# Starts messaging services (e.g. Kafka)
#./scripts/start_messaging.sh

# Start istio (API gateway as ingress)
./scripts/start_istio.sh

# Start apps/services (e.g. Frontend, Storybook, BFF, database interop services, etc.)
./scripts/start_apps.sh

# Start frontend next.js server and storybook
#./scripts/start_frontend.sh

# Start nginx @ port 8080 (setup on nginx/default.conf) as reverse proxy (shares network with localhost)
# It is started as a standalone docker container outside of the cluster, as in real-world scenario.
./scripts/start_nginx.sh

echo -e "\n"
echo "Listening on localhost:$NGINX_PROXY_PORT"
echo "Redirecting to localhost:$ISTIO_INGRESS_PORT (Istio ingress)"
echo "Change these ports in the 'start.sh' file's environment variables."
echo -e "\n"

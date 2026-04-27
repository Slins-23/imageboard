# Start database interop services
yq -r ".databases.postgresql[].name" charts/databases/values.yaml | while read name; do
   helm install $name charts/node-app -f apps/services/$name/values.yaml -n apps
done

# Start BFF (Backend-for-frontend / API gateway (not cluster ingress, for public API calls))
helm install bff-users charts/node-app -f apps/bff/users/values.yaml -n apps

# Start frontend-dev
helm install frontend-dev charts/frontend-dev -n apps

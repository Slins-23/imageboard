helm uninstall frontend-dev -n apps

helm uninstall swagger-ui -n apps

helm uninstall bff-users -n apps

yq -r ".global.postgresql[] | select( .enabled == true ) | .name" charts/databases/values.yaml | while read name; do
  helm uninstall $name -n apps
done

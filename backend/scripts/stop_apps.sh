helm uninstall frontend-dev -n apps

helm uninstall bff-users -n apps

yq -r ".global.postgresql[].name" charts/databases/values.yaml | while read name; do
  helm uninstall $name -n apps
done

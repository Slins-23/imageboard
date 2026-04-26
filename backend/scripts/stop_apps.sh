helm uninstall bff-users -n apps

yq -r ".databases.postgresql[].name" charts/databases/values.yaml | while read name; do
  helm uninstall $name -n apps
done

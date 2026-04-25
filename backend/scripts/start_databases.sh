#helm install postgresql charts/postgresql -n databases
helm install databases charts/databases -n databases


#yq -r ".databases.postgresql[].name" charts/databases/values.yaml | while read name; do
#  kubectl wait --for=condition=ready pod -l app=postgresql-$name -n databases --timeout=60s
#done

#sudo chown -R $(id -u):$(id -g) data/postgresql

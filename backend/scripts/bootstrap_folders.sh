echo "Bootstrapping data folders (if they do not exist)..."

mkdir -p data/prometheus
mkdir -p data/grafana
mkdir -p data/jaeger

BASE_POSTGRESQL_DIR="data/postgresql"

yq -r ".databases.postgresql[].name" charts/databases/values.yaml | while read name; do
  mkdir -p "$BASE_POSTGRESQL_DIR/$name"
done

#sudo chown -R 999:999 $BASE_POSTGRESQL_DIR
#sudo chmod -R 777 $BASE_POSTGRESQL_DIR

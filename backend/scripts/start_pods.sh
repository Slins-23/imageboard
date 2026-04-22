helm install registry charts/registry -n registry --wait
#kubectl wait --for=condition=ready pod -l app=cluster-registry --timeout=120s
#kubectl port-forward svc/cluster-registry-svc 5000:5000 > charts/registry/logs/pf.log 2>&1 &

helm install postgresql charts/postgresql -n databases
#kubectl port-forward svc/postgres-svc 5001:5001 > charts/postgresql/logs/pf.log 2>&1 &
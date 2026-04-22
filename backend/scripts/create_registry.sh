#kubectl apply -f registry/registry-pvc.yaml
#kubectl apply -f registry/registry-deployment.yaml
#kubectl apply -f registry/registry-svc.yaml
#kubectl wait --for=condition=ready pod -l app=cluster-registry --timeout=120s
#kubectl port-forward svc/cluster-registry-svc 5000:5000 > pf.log 2>&1 &

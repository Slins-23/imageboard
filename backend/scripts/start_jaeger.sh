helm install jaeger-operator charts/jaeger-operator -n monitoring --wait
kubectl rollout status deployment/jaeger-operator -n monitoring
kubectl wait --for=condition=Established crd/jaegers.jaegertracing.io --timeout=60s

kubectl wait \
  --for=condition=ready pod \
  -l app.kubernetes.io/name=jaeger-operator \
  -n monitoring \
  --timeout=120s

kubectl wait \
  --for=jsonpath='{.subsets[0].addresses[0].ip}' \
  endpoints/jaeger-operator-webhook-service \
  -n monitoring \
  --timeout=120s



helm install jaeger charts/jaeger -n monitoring
#helm install jaeger charts/jaeger -n monitoring
#helm install jaeger charts/jaeger -n monitoring
#kubectl rollout status deployment/jaeger-operator -n monitoring
#kubectl wait --for=condition=Established crd/jaegers.jaegertracing.io --timeout=60s

#kubectl get pods,svc,endpoints -n monitoring | grep jaeger
#kubectl rollout status deployment/jaeger-operator -n monitoring
#kubectl logs deployment/jaeger-operator -n monitoring

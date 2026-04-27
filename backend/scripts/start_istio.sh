kubectl label namespace frontend istio-injection=enabled
kubectl label namespace default istio-injection=enabled
kubectl label namespace databases istio-injection=enabled
kubectl label namespace messaging istio-injection=enabled
kubectl label namespace registry istio-injection=enabled
#kubectl label namespace monitoring istio-injection=disabled
kubectl label namespace monitoring istio-injection=enabled
kubectl label namespace apps istio-injection=enabled

helm install istio-base charts/istio-base -n istio-system
helm install istiod charts/istiod -n istio-system
helm install istio-ingress charts/istio-gateway -n istio-system \
  --wait

helm install istio-ingress-cfg charts/istio-ingress-cfg -n istio-system --wait

#helm install istio-mtls charts/istio-mtls -n istio-system --wait

kubectl port-forward svc/istio-ingress -n istio-system ${ISTIO_INGRESS_PORT:-5000}:80 > charts/istio-gateway/logs/log.pf 2>&1 &


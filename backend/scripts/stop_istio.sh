helm uninstall istio-ingress-cfg -n istio-system
helm uninstall istio-ingress -n istio-system
helm uninstall istiod -n istio-system
helm uninstall istio-base -n istio-system

kubectl label namespace registry istio-injection-
kubectl label namespace databases istio-injection-
kubectl label namespace default istio-injection-

helm install frontend-dev charts/frontend-dev -n apps --wait
#kubectl exec -n frontend deploy/frontend-dev -- npm run dev
#kubectl exec -n frontend deploy/frontend-dev -- npm run storybook

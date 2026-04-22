helm install frontend-dev charts/frontend-dev -n frontend --wait
#kubectl exec -n frontend deploy/frontend-dev -- npm run dev
#kubectl exec -n frontend deploy/frontend-dev -- npm run storybook

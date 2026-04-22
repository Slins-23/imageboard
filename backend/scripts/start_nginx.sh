docker pull nginx:mainline-alpine3.23-perl

DOCKER_RUN_SUCCESS=$(docker run --name nginx -v ./nginx/default.conf:/etc/nginx/conf.d/default.conf -v ./nginx/proxy_params:/etc/nginx/proxy_params --network host -d nginx:mainline-alpine3.23-perl)

if [ $DOCKER_RUN_SUCCESS ]; then
  echo -e "\n"
  echo "NGINX (Reverse proxy) started successfully!"
  echo -e "\n"
fi


DIR=`pwd`
echo $DIR
docker run \
  --name myNginx \
  -d -p 80:80 \
  -v $DIR/mobile/dist:/usr/share/nginx/html \
  -v $DIR/nginx_conf/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $DIR/nginx_conf/conf.d:/etc/nginx/conf.d \
  nginx

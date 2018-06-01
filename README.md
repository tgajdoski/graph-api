

yarn install


yarn dev





 nvm use 8.11.1

create docker image
docker build -t graphql-yoga .

map local image to docker hub image 
docker tag graphql-yoga gajdo/graphql-yoga

push to docker hub
docker push gajdo/graphql-yoga



on aws  EC2 server:
restart docker service:
docker push gajdo/graphql-yoga

get new version:
docker push gajdo/graphql-yoga

start docker image:
docker run -p 41960:4000 gajdo/graphql-yoga



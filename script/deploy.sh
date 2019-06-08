#!/bin/bash
source $PWD/script/common.sh
DOCKER_COMPOSE_FILE=$1
ENV=${@:2}

# Expoert all env
createENV $ENV
# Start docker server
sudo docker-compose down
sudo docker-compose build
sudo PWD=$PWD docker-compose run app npm install
sudo PWD=$PWD docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

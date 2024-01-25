#!/bin/bash

# sleep 2
docker exec -i area_database apt-get update
docker exec -i area_database apt-get install -y mysql-client
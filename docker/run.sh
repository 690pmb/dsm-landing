#!/bin/sh

docker run --name dsm -e TITLE=$TITLE -e BASE_URL=$BASE_URL --restart unless-stopped -d -p 9696:8080 -t pmb69/dsm-landing:0.1.0

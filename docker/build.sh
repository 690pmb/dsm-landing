#!/bin/sh

docker build --build-arg GITHUB_DIR=69pmb --build-arg GITHUB_PROJECT=dsm-landing --build-arg GITHUB_HASH=master -t dsm-landing https://raw.githubusercontent.com/69pmb/dsm-landing/master/docker/Dockerfile

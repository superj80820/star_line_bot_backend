#!/bin/bash
echo "Updating staging Server"
echo "stopping test.service"
sudo systemctl stop test.service
# remove all outdated images and containers
echo "removing outdated/dangling images and containers"
sudo docker rmi crater/test:latest
# create new image for test
echo "create new image for test"
cd ~/tmp
# git pull origin master
git clone https://github.com/superj80820/star_line_bot_backend.git
sudo docker build -t="crater/test" .
# restart service which will use the newly pulled image
echo "restarting test service"
sudo systemctl start test.service
# App is updated!
echo "test successfuly updated!"
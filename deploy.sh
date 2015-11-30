#!/bin/bash

TESTENV=$1

if [ "$#" -ne 1 ]
then
  echo "You must provide the ip address of the test server"
  exit 1
fi

echo " -- Pushing to docker hub"
echo
docker push kristjano/tictactoe
echo

echo " -- Accessing test machine"
ssh vagrant@$TESTENV << EOF
  # ssh remote execution
  echo " -- Stopping previous version running"
  echo
  docker stop testenv
  docker rm testenv
  echo

  echo " -- Pulling from docker hub"
  echo
  docker pull kristjano/tictactoe
  echo

  echo " -- Start test environment"
  echo
  docker run -p 8080:8080 -d --name=testenv -e "NODE_ENV=production" kristjano/tictactoe

  echo " -- You should now be able to access the project from"
  echo "    the production-test environment"
  echo

  echo "Running on http://$TESTENV:9090/"
  echo
EOF

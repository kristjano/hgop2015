#!/bin/bash

echo " -- Pushing to docker hub"
echo
docker push kristjano/tictactoe
echo

echo " -- Accessing test machine"
echo " --- Enter password when prompted"
echo
ssh vagrant@10.0.0.11 << EOF
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
  docker run -p 9090:8080 -d --name=testenv -e "NODE_ENV=production" kristjano/tictactoe

  echo " -- You should now be able to access the project from"
  echo "    the production-test environment"
  echo

  echo "Running on http://10.0.0.11:9090/"
  echo
EOF

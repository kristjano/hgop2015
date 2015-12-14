#!/bin/bash

if [ "$#" -ne 3 ]
then
  echo "You must provide the ip address and port number of the test server"
  echo "Plus the previous successful git commit"
  exit 1
fi
TESTENV=$1
PORTNR=$2
COMMIT=$3


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
  docker run -p $PORTNR:8080 -d --name=testenv -e "NODE_ENV=production" kristjano/tictactoe:$COMMIT

  echo " -- You should now be able to access the project from"
  echo "    the production-test environment"

  echo
EOF

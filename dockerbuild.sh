#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
# Abort the script if grunt fails
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t kristjano/tictactoe .
# Abort the script if docker build fails
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

echo "Done"

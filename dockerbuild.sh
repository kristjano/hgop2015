#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
# Abort the script if grunt fails
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Grunt build failed with exit code " $rc
    exit $rc
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
rc=$?
if [[ $rc != 0 ]] ; then
    echo "NPM install failed with exit code " $rc
    exit $rc
fi

echo Building docker image
docker build -t kristjano/tictactoe .
# Abort the script if docker build fails
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

echo "Done"

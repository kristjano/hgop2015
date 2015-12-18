# Report

### Vagrant
Vagrant sér um að búa til og setja upp umhverfið sem forritið á að keyra á.
Með því að slá inn eina línu í skel setur Vagrant upp sýndarvél og setur upp
þann hugbúnað sem verkefnið þarf á að halda, svo það geti keyrt.

### VirtualBox
VirtualBox er hugbúnaður sem býr til sýndarvélar sem hægt er að keyra
stýrikerfi á.

### Grunt
Grunt er forrit í skel sem keyrir sjálfvirk verkefni í hugbúnaðarferlinu. Þetta
geta verið einingarprófanir og aðrar sjálfvirkar prófanir eða önnur verkefni
til að gefa út hugbúnaðinn.

### NPM
NPM sér um að sækja öll þau forritasöfn sem NodeJS verkefnið notar til að
búa til forritið. Þetta geta bæði verið forritasöfn sem notuð eru í forritinu
sjálfu eða forritasöfn sem notuð eru í þróunarferlinu.

### Node.js
Node.js er JavaScript túlkur sem gerir manni kleift að keyra JavaScript á
netþjóni.

### Bower
Bower sér um að sækja öll þau forritasöfn sem notuð eru í framenda veffortsins.

## Deployment path
I've implemented a bash script `deploy.sh` and when run on the development
machine it pushes the newest docker build to Docker Hub. Then it logs into
a production-test environment that should be running parallel in another VM
on the host machine or on another machine. On the production-test machine it
pulls from Docker Hub the latest build and runs it.

## Capacity tests
The Capacity tests are run asynchronously, i.e. they run in parallel.

## Day 10
Með því að commita kóða á git og fá þá hash fyrir öll commit gerir manni kleyft
að sækja nákvæma útgáfu af kóðanum á þeim tímapunkti. Með deploy skritfunni sem
við höfum nú gert er hægt að setja hash, fyrir hvaða commit sem er, í arguments
og deployað þeirri útgáfu á það umhverfi sem þú kýst (með því að setja ip tölu
og port í arguments).

## Scripts
### Commit stage

    export DISPLAY=:0
    export PATH="/usr/local/bin:$PATH"
    npm install && bower install && ./dockerbuild.sh

### Acceptance stage

    export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
    ./deploy.sh 10.0.0.11 8080 $GIT_UPSTREAM_HASH



    export ACCEPTANCE_URL=http://10.0.0.11:8080
    export PATH="/usr/local/bin:$PATH"
    npm install && bower install && grun mochaTest:acceptance


### Capacity test stage

    export ACCEPTANCE_URL=http://10.0.0.11:8080
    export PATH="/usr/local/bin:$PATH"
    npm install && bower install && grunt mochaTest:load


### Deploy stage

    export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
    ./deploy.sh 10.0.0.11 8081 $GIT_UPSTREAM_HASH

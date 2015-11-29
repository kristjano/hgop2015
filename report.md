# Report

## Vagrant
Vagrant sér um að búa til og setja upp umhverfið sem forritið á að keyra á.
Með því að slá inn eina línu í skel setur Vagrant upp sýndarvél og setur upp
þann hugbúnað sem verkefnið þarf á að halda, svo það geti keyrt.

## VirtualBox
VirtualBox er hugbúnaður sem býr til sýndarvélar sem hægt er að keyra
stýrikerfi á.

## Grunt
Grunt er forrit í skel sem keyrir sjálfvirk verkefni í hugbúnaðarferlinu. Þetta
geta verið einingarprófanir og aðrar prófanir sem hægt er að gera sjálfvirk og
önnur verkefni til að gefa út hugbúnaðinn.

## NPM
NPM sér um að sækja öll þau forritasöfn sem NodeJS verkefnið notar til að
búa til forritið. Þetta geta bæði verið forritasöfn sem notuð eru í forritinu
sjálfu eða library sem notuð eru í þróunarferlinu.

## Node.js
Node.js er JavaScript túlkur sem gerir manni kleift að keyra JavaScript á
netþjóni.

## Bower
Bower sér um að sækja öll þau forritasöfn sem notuð eru í framenda veffortsins.

## Deployment path
I've implemented a bash script `deploy.sh` and when run on the development
machine it pushes the newest docker build to Docker Hub. Then it logs into
a production-test environment that should be running parallel in another VM
on the host machine. On the production-test machine it pulls from Docker Hub
the latest build and runs it.

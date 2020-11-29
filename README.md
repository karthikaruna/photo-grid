## The following features have been implemented

 1. Photo display
 2. Photo search
 3. Infinite scroll
 4. Photo "like"
 5. Photo zoom
 6. Fully responsive

## How to run in dev mode?

    npm install -g parcel-bundler
    cd signeasy-demo
    parcel src/index.html

## How to build for prod?

    parcel build src/index.html

## How to run in prod mode?
Any basic server should work. Following is an example with the package `http-server`.

    npm install -g http-server
    cd signeasy-demo
    http-server dist

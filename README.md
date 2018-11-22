# CF Sample App Node.js

A sample [Express](http://expressjs.com/) application to deploy to Cloud Foundry which works out of the box.

## Run locally

1. Install [Node.js and npm](https://nodejs.org/)
1. Run `npm install`
1. Run `npm start`
1. Visit [http://localhost:3000](http://localhost:3000)

## Run in the cloud

1. Install the [cf CLI](https://github.com/cloudfoundry/cli#downloads)
1. Run `cf push my-nodejs-app -m 128M --random-route`
1. Visit the given URL

## Tune app using environment variables

This application reads environment variables, which are rendered in the HTML view:
 - `TITLE`: page title
 - `MESSAGE`: page body

If you are running locally, set these variables before launching the app:
```shell
$ TITLE="New title" MESSAGE="I am updating environment variables" npm start
```

If you deployed the app to Cloud Foundry, use these commands to set environment variables:
```shell
$ cf set-env my-nodejs-app TITLE "New title"
$ cf set-env my-nodejs-app MESSAGE "I am updating environment variables"
$ cf restage my-nodejs-app
```

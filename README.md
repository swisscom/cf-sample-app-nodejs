# CF Sample App Node

A sample [Express](http://expressjs.com/) application to deploy to Cloud Foundry which works out of the box.

## Run locally

1. Install [Node.js and npm](https://nodejs.org/)
1. Run `npm install`
1. Run `npm start`
1. Visit [http://localhost:3000](http://localhost:3000)

## Run in the cloud

1. Install the [cf CLI](https://github.com/cloudfoundry/cli#downloads)
1. Run `cf create-service mongodb small my-mongodb`
1. Wait about 3 minutes until the MongoDB is ready
1. Relace the "my-random-hostname" in `manifest.yml` with something creative
1. Run `cf push`
1. Visit the given URL

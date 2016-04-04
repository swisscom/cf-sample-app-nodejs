# cf-sample-app-node

A sample application to deploy to Cloud Foundry which works out of the box

## Run locally

1. Run `npm install`
1. Run `npm start`
1. Visit [http://localhost:3000](http://localhost:3000)

## Run in the cloud

1. Run `cf push cf-sample-app-node -m 128M -n my-random-hostname` (replacing my-random-hostname with something creative)
1. Visit the given URL

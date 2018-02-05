# GraphQL server with mongodb

GraphQL server implementation with subscriptions and mongodb for data store

## Setup

```
git clone https://github.com/preetb123/graphql-server-with-mongodb.git
cd graphql-server-with-mongodb
yarn install

# make sure you have [mongodb](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3) installed
# start the mongodb
brew services start mongodb
# make mongodb available to server
export MONGODB_URI=mongodb://localhost/eventsite
# this will run the app using nodemon
yarn dev
```

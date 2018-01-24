const express = require('express');
const { createServer } = require('http');
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { subscribe, execute } = require('graphql');
const schema = require('./schema');
const db = require('./db');

const app = express();

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
  context:{
    db
  },
  schema
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}))
 
const server = createServer(app);

server.listen(PORT, () => {
  new SubscriptionServer({
    schema,
    execute,
    subscribe,
    onConnect: () => console.log('client connected'),
  }, {
    server,
    path: '/subscriptions'
  })
  console.log(`Listening on port ${PORT}`);
})
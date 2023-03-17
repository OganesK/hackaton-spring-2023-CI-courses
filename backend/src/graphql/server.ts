import { ApolloServer } from 'apollo-server-express';

import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import dataSources from '../datasources';
import schema from './schema';
import context from './context';

const config = {
  schema,
  context,
  dataSources,
  tracing: true,
  introspection: process.env.ENV_NAME !== 'production',
  plugins: process.env.ENV_NAME !== 'production' ? [ApolloServerPluginLandingPageGraphQLPlayground()] : [],
};

const server = new ApolloServer(config);

export default server;

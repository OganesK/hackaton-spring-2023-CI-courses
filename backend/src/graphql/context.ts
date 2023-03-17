import { DataSourceConfig } from 'apollo-datasource';
import { PrismaClient, User } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';

import express from 'express';
import prisma from '../prisma-client';
import pubsub from '../pubsub';
import { ApolloDataSources } from '../datasources';
import { UsersAPI } from '../datasources/users';

export interface InitialContext {
  prisma: PrismaClient;
  user: User | null;
  response: express.Response;
  pubsub: RedisPubSub | PubSub;
}

export interface Context extends InitialContext {
  dataSources: ApolloDataSources;
}

export default async ({ req, connection, res }: { req: express.Request; connection: any, res: express.Response }): Promise<InitialContext> => {
  const context: InitialContext = {
    prisma,
    response: res,
    user: null,
    pubsub,
  };

  const usersAPI = new UsersAPI();

  usersAPI.initialize({ context } as DataSourceConfig<Context>);

  const authorization = req ? req?.headers?.authorization : connection?.context?.authorization;

  if (authorization) {
    const user = await usersAPI.findUserByToken(authorization);

    context.user = user;
  }

  return context;
};

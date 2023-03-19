import { makeSchema } from 'nexus';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { applyMiddleware } from 'graphql-middleware';
import path from 'path';
import { DateTime } from 'graphql-iso-date';

import { nexusPrisma } from 'nexus-plugin-prisma';
import * as middlewares from '../middlewares';

import prisma from '../../prisma-client';
import * as types from './types';

const rawSchema = makeSchema({
  types: [types],
  plugins: [nexusPrisma(),
  nexusSchemaPrisma({
    // eslint-disable-next-line no-return-assign
    prismaClient: (ctx) => ctx.prisma = prisma,
    experimentalCRUD: true,
    scalars: {
      DateTime,
    },
  })],
  outputs: {
    typegen: path.join(__dirname, '../../generated/typings.ts'),
    schema: path.join(__dirname, '../../generated/schema.graphql'),
  },
});

const schema = applyMiddleware(
  rawSchema,
  middlewares.shield,
);

export default schema;

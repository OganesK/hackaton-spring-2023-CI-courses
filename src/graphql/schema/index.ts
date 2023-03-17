import { makeSchema } from 'nexus';
import { applyMiddleware } from 'graphql-middleware';
import path from 'path';

import * as middlewares from '../middlewares';

import * as types from './types';

const rawSchema = makeSchema({
  types: [types],
  plugins: [],
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

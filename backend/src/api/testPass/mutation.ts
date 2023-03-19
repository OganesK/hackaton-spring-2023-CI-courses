import { extendType } from 'nexus';

export const TestPassMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.updateOneTestPass();

    t.crud.createOneTestPass();
  },
});
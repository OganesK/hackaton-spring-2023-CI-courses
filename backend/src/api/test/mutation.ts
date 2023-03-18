import { extendType } from 'nexus';

export const TestMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.updateOneTest();

    t.crud.createOneTest();
  },
});
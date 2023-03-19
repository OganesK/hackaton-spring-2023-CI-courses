import { extendType } from 'nexus';

export const TestPassQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.testPass();

    t.crud.testPasses();
  },
});

import { extendType } from 'nexus';

export const TestQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.test();

    t.crud.tests();
  },
});

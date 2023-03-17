import { extendType } from 'nexus';

export const EmailQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.email();

    t.crud.emails({
      filtering: true,
    });
  },
});

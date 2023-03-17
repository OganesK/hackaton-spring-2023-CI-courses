import { extendType } from 'nexus';

export const ContactQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.contact();

    t.crud.contacts({
      filtering: true,
      ordering: true,
    });
  },
});

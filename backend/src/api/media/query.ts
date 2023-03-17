import { extendType } from 'nexus';

export const MediaQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.media({
      filtering: true,
    });
  },
});

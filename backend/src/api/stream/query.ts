import { extendType } from 'nexus';

export const StreamQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.stream();
    t.crud.streams();
  },
});

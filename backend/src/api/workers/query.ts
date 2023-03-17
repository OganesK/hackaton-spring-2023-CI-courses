import { extendType } from 'nexus';

export const WorkerQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.worker();

    t.crud.workers({
      filtering: true,
      ordering: true,
    });
  },
});

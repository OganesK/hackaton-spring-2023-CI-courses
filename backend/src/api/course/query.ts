import { extendType } from 'nexus';

export const ProjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.project();

    t.crud.projects({
      filtering: true,
      ordering: true,
    });

    t.crud.projectMetrics({
      filtering: true,
      ordering: true,
    });
  },
});

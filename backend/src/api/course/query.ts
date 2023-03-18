import { extendType } from 'nexus';

export const ProjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.course();

    t.crud.courses({
      filtering: true,
      ordering: true,
    });
  },
});

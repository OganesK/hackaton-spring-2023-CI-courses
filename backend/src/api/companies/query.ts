import { extendType } from 'nexus';

export const CompanyQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.company();

    t.crud.companies({
      filtering: true,
      ordering: true,
    });
  },
});

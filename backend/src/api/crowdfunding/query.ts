import { arg, extendType, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../graphql/context';

export const CrowdFundingQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.crowdFunding();

    t.crud.crowdFundings({
      filtering: true,
      ordering: true,
    });

    t.field('crowdFundingQuery', {
      type: 'CrowdFunding',
      args: { data: nonNull(arg({ type: crowdFundingQueryInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.crowdFunding.findUnique({
          where: {
            id: data.crowdFundingId,
          },
          include: {
            tariffs: true,
            story: {
              include: {
                sections: {
                  orderBy: {
                    number: 'asc',
                  },
                  include: {
                    media: true,
                  },
                },
              },
            },
          },
        });
      },
    });
  },
});

export const crowdFundingQueryInput = inputObjectType({
  name: 'crowdFundingQueryInput',
  definition (t) {
    t.int('crowdFundingId');
  },
});

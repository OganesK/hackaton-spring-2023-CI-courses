import { extendType } from 'nexus';
import { Context } from '../../graphql/context';

export const PlatformConfigQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getPlatformConfig', {
      type: 'PlatformConfig',
      args: {},
      resolve: async (_, { }, ctx: Context) => {
        const latestConfig = await ctx.prisma.platformConfig.findMany({
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          include: {
            projectsShownOnLanding: true,
            newsShownOnLanding: true,
            offersShownOnLanding: true,
            crowdFundingsShownOnLanding: true,
          },
        });

        return latestConfig[0];
      },
    });
  },
});

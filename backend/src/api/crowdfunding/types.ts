import { objectType } from 'nexus';
import { Context } from '../../graphql/context';
import { DEFAULT_IMAGE } from '../../config';

export * from './query';
export * from './mutation';

export const CrowdFunding = objectType({
  name: 'CrowdFunding',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.title();
    t.model.shortDescription();
    t.model.platformConfigShowed();
    t.model.story();
    t.field('poster', {
      type: 'Media',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.posterId === null) {
          const crowdFunding = await ctx.prisma.crowdFunding.update({
            where: {
              id: parent.id,
            },
            data: {
              poster: {
                connect: {
                  url: DEFAULT_IMAGE,
                },
              },
            },
            include: {
              poster: true,
            },
          });

          return crowdFunding.poster;
        }

        return ctx.prisma.media.findUnique({
          where: {
            id: parent.posterId,
          },
        });
      },
    });
    t.model.project();
    t.model.start();
    t.model.end();
    t.model.goalSum();
    t.model.nowSum();
    t.model.moderate();
    t.model.moderationChecked();
    t.model.isApproved();
    t.model.tariffs();
    t.model.crowdFundingMedia();
    t.field('activeCheck', {
      type: 'Boolean',
      resolve: async (parent: any, { }, ctx: Context) => {
        const isActive = new Date(parent.end) < new Date();

        return isActive !== true;
      },
    });
  },
});

export const CrowdFundingtariff = objectType({
  name: 'CrowdFundingTariff',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.title();
    t.model.price();
    t.model.buyerCount();
    t.model.crowdFunding();
    t.model.description();
  },
});

export const payedTariffs = objectType({
  name: 'payedTariffs',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.address();
    t.model.crowdfunding();
    t.model.email();
    t.model.fatherName();
    t.model.firstName();
    t.model.lastName();
    t.model.summ();
  },
});

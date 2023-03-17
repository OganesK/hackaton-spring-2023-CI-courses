import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import { Context } from '../../graphql/context';
import { DEFAULT_IMAGE } from '../../config';

export const CrowdFundingMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('crowdFundingCreateMutation', {
      type: 'CrowdFunding',
      args: { data: nonNull(arg({ type: 'crowdFundingCreateInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.crowdFunding.create({
          data: {
            project: {
              connect: {
                id: data.projectId,
              },
            },
            title: data.title,
            shortDescription: data.shortDescription,
            start: data.start,
            end: data.end,
            goalSum: data.goalSum,
            poster: {
              connect: {
                url: DEFAULT_IMAGE,
              },
            },
          },
        });
      },
    });

    t.field('crowdFundingUpdateMutation', {
      type: 'CrowdFunding',
      args: { data: nonNull(arg({ type: 'crowdFundingUpdateInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        const oldData = await ctx.prisma.crowdFunding.findUnique({
          where: {
            id: data.crowdFundingId,
          },
        });

        return ctx.prisma.crowdFunding.update({
          where: {
            id: data.crowdFundingId,
          },
          data: {
            moderationChecked: false,
            title: data.title !== null ? data.title : oldData.title,
            shortDescription: data.shortDescription !== null ? data.shortDescription : oldData.shortDescription,
            start: data.start !== null ? data.start : oldData.start,
            end: data.end !== null ? data.end : oldData.end,
            goalSum: data.goalSum !== null ? data.goalSum : oldData.goalSum,
          },
        });
      },
    });

    t.field('crowdFundingDeleteMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: 'crowdFundingDeleteInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.crowdFunding.delete({
            where: {
              id: data.crowdFundingId,
            },
          });
          return 'Success';
        } catch (error) {
          return 'Error';
        }
      },
    });

    /* ===================================================================== */

    t.field('tariffCreateMutation', {
      type: 'CrowdFundingTariff',
      args: { data: nonNull(arg({ type: CreateTariffInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.crowdFundingTariff.create({
          data: {
            crowdFunding: {
              connect: {
                id: data.crowdFundingId,
              },
            },
            title: data.title,
            description: data.description,
            price: data.price,
          },
        });
      },
    });

    t.field('tariffUpdateMutation', {
      type: 'CrowdFundingTariff',
      args: { data: nonNull(arg({ type: UpdateTariffInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const oldData = await ctx.prisma.crowdFundingTariff.findUnique({
          where: {
            id: data.tariffId,
          },
        });

        return ctx.prisma.crowdFundingTariff.update({
          where: {
            id: data.tariffId,
          },
          data: {
            title: data.title !== null ? data.title : oldData.title,
            description: data.description !== null ? data.description : oldData.description,
            price: data.price !== null ? data.price : oldData.price,
          },
        });
      },
    });

    t.field('tariffDeleteMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: DeleteTariffInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.crowdFundingTariff.delete({
            where: {
              id: data.tariffId,
            },
          });

          return 'Success';
        } catch (error) {
          throw new Error(error);
        }
      },
    });

    /* ===================================================================== */

    t.field('payForTariff', {
      type: 'String',
      args: { data: nonNull(arg({ type: PayForTariffInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const tariff = await ctx.prisma.crowdFundingTariff.findUnique({
            where: {
              id: data.tariffId,
            },
            include: {
              crowdFunding: true,
            },
          });

          await ctx.prisma.crowdFunding.update({
            where: {
              id: tariff.crowdFundingId,
            },
            data: {
              nowSum: tariff.crowdFunding.nowSum + tariff.price,
            },
          });

          await ctx.prisma.payedTariffs.create({
            data: {
              crowdfunding: {
                connect: {
                  id: tariff.crowdFundingId,
                },
              },
              summ: tariff.price,
              firstName: data.firstName,
              lastName: data.lastName,
              fatherName: data.fatherName,
              email: data.email,
              address: data.address,
            },
          });

          await ctx.prisma.crowdFundingTariff.update({
            where: {
              id: tariff.id,
            },
            data: {
              buyerCount: ++tariff.buyerCount,
            },
          });

          return 'Success';
        } catch (error) {
          throw new Error(error);
        }
      },
    });
  },
});

/* ===================================================================== */

/* ===================================================================== */

export const crowdFundingCreateInput = inputObjectType({
  name: 'crowdFundingCreateInput',
  definition (t) {
    t.nonNull.int('projectId');
    t.nonNull.string('title');
    t.nonNull.string('shortDescription');
    t.nonNull.field('start', { type: 'DateTime' });
    t.nonNull.field('end', { type: 'DateTime' });
    t.nonNull.float('goalSum');
  },
});

export const crowdFundingUpdateInput = inputObjectType({
  name: 'crowdFundingUpdateInput',
  definition (t) {
    t.nonNull.int('crowdFundingId');
    t.string('title');
    t.string('shortDescription');
    t.field('start', { type: 'DateTime' });
    t.field('end', { type: 'DateTime' });
    t.float('goalSum');
  },
});

export const crowdFundingDeleteInput = inputObjectType({
  name: 'crowdFundingDeleteInput',
  definition (t) {
    t.nonNull.int('crowdFundingId');
  },
});

export const CreateTariffInput = inputObjectType({
  name: 'CreateTariffInput',
  definition (t) {
    t.nonNull.int('crowdFundingId');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.float('price');
  },
});

export const UpdateTariffInput = inputObjectType({
  name: 'UpdateTariffInput',
  definition (t) {
    t.nonNull.int('tariffId');
    t.string('title');
    t.string('description');
    t.float('price');
  },
});

export const DeleteTariffInput = inputObjectType({
  name: 'DeleteTariffInput',
  definition (t) {
    t.nonNull.int('tariffId');
  },
});

export const PayForTariffInput = inputObjectType({
  name: 'PayForTariffInput',
  definition (t) {
    t.nonNull.int('tariffId');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('fatherName');
    t.nonNull.string('address');
    t.nonNull.string('email');
  },
});

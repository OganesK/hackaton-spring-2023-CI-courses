import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import { Context } from '../../graphql/context';
import { DEFAULT_IMAGE } from '../../config';

export const CompanyMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createCompany', {
      type: 'Company',
      args: { data: nonNull(arg({ type: createCompanyInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.company.create({
          data: {
            name: data.name,
            shortDescription: data.shortDescription,
            description: data.description,
            activityKind: data.activityKind,
            inn: data.inn,
            mainRegion: data.mainRegion,
            mainContact: data.mainContact,
            owner: {
              connect: {
                id: ctx.user.id,
              },
            },
            avatar: {
              connect: {
                url: DEFAULT_IMAGE,
              },
            },
          },
        });
      },
    });

    t.field('updateMyCompany', {
      type: 'String',
      args: { data: nonNull(arg({ type: updateCompanyInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const companyData = await ctx.prisma.company.findUnique({
            where: {
              id: data.companyId,
            },
          });

          await ctx.prisma.company.update({
            where: {
              id: data.companyId,
            },
            data: {
              moderationChecked: false,
              name: data.name !== null ? data.name : companyData.name,
              description: data.description !== null ? data.description : companyData.description,
              shortDescription: data.shortDescription !== null ? data.shortDescription : companyData.shortDescription,
              activityKind: data.activityKind !== null ? data.activityKind : companyData.activityKind,
              inn: data.inn !== null ? data.inn : companyData.inn,
              mainRegion: data.mainRegion !== null ? data.mainRegion : companyData.mainRegion,
              mainContact: data.mainContact !== null ? data.mainContact : companyData.mainContact,
            },
          });

          return 'Success!';
        } catch (error) {
          return `Company not updated${error}`;
        }
      },
    });

    t.crud.deleteOneCompany();
  },
});

export const createCompanyInput = inputObjectType({
  name: 'createCompanyInput',
  definition (t) {
    t.nonNull.string('name');
    t.nonNull.string('shortDescription');
    t.nonNull.string('description');
    t.nonNull.field('activityKind', {
      type: 'filteringCategoies',
    });
    t.string('inn');
    t.string('mainRegion');
    t.string('mainContact');
  },
});

export const updateCompanyInput = inputObjectType({
  name: 'updateCompanyInput',
  definition (t) {
    t.nonNull.int('companyId');
    t.string('name');
    t.string('shortDescription');
    t.string('description');
    t.field('activityKind', {
      type: 'filteringCategoies',
    });
    t.string('inn');
    t.string('mainRegion');
    t.string('mainContact');
  },
});

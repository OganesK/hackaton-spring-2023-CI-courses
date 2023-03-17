import { arg, extendType, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../graphql/context';
import { DEFAULT_IMAGE } from '../../config';

export const ProjectMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOneProject', {
      type: 'Project',
      args: { data: nonNull(arg({ type: createProjectInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.project.create({
          data: {
            name: data.name,
            category: data.category,
            projectSite: data.projectSite || null,
            projectType: data.projectType || null,
            projectStage: data.projectStage || null,
            projectMarket: data.projectMarket || null,
            technologyType: data.technologyType || null,
            investmentStage: data.investmentStage || null,
            salesType: data.salesType || null,
            businessModel: data.businessModel || null,
            mainGoal: data.mainGoal || null,
            shortDescription: data.shortDescription,
            workers: {
              create: {
                position: 'Руководитель',
                worker: {
                  connect: {
                    id: ctx.user.id,
                  },
                },
              },
            },
            ownerCompany: {
              connect: {
                id: data.ownerCompany,
              },
            },
            poster: {
              connect: {
                url: DEFAULT_IMAGE,
              },
            },
          },
        });
      },
    });

    t.field('updateProject', {
      type: 'String',
      args: { data: nonNull(arg({ type: updateProjectInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const projectData = await ctx.prisma.project.findUnique({
          where: {
            id: data.projectId,
          },
        });

        await ctx.prisma.project.update({
          where: {
            id: data.projectId,
          },
          data: {
            moderationChecked: false,
            name: data.name !== null ? data.name : projectData.name,
            shortDescription: data.shortDescription !== null ? data.shortDescription : projectData.shortDescription,
            category: data.category !== null ? data.category : projectData.category,
            projectSite: data.projectSite !== null ? data.projectSite : projectData.projectSite,
            projectType: data.projectType !== null ? data.projectType : projectData.projectType,
            projectStage: data.projectStage !== null ? data.projectStage : projectData.projectStage,
            projectMarket: data.projectMarket !== null ? data.projectMarket : projectData.projectMarket,
            technologyType: data.technologyType !== null ? data.technologyType : projectData.technologyType,
            investmentStage: data.investmentStage !== null ? data.investmentStage : projectData.investmentStage,
            salesType: data.salesType !== null ? data.salesType : projectData.salesType,
            businessModel: data.businessModel !== null ? data.businessModel : projectData.businessModel,
            mainGoal: data.mainGoal !== null ? data.mainGoal : projectData.mainGoal,
          },
        });

        return 'Success!';
      },
    });

    t.crud.deleteOneProject();
  },
});

export const updateProjectInput = inputObjectType({
  name: 'updateProjectInput',
  definition (t) {
    t.nonNull.int('projectId');
    t.string('name');
    t.string('projectSite');
    t.field('category', {
      type: 'filteringCategoies',
    });
    t.field('projectType', {
      type: 'projectType',
    });
    t.field('projectStage', {
      type: 'projectStage',
    });
    t.field('projectMarket', {
      type: 'projectMarket',
    });
    t.field('technologyType', {
      type: 'technologyType',
    });
    t.field('investmentStage', {
      type: 'investmentStage',
    });
    t.field('salesType', {
      type: 'salesType',
    });
    t.field('businessModel', {
      type: 'businessModel',
    });
    t.field('mainGoal', {
      type: 'mainGoal',
    });
    t.string('shortDescription');
  },
});

export const createProjectInput = inputObjectType({
  name: 'createProjectInput',
  definition (t) {
    t.nonNull.string('name');
    t.nonNull.field('category', {
      type: 'filteringCategoies',
    });
    t.nonNull.string('shortDescription');
    t.nonNull.int('ownerCompany');
    t.string('projectSite');
    t.field('projectType', {
      type: 'projectType',
    });
    t.field('projectStage', {
      type: 'projectStage',
    });
    t.field('projectMarket', {
      type: 'projectMarket',
    });
    t.field('technologyType', {
      type: 'technologyType',
    });
    t.field('investmentStage', {
      type: 'investmentStage',
    });
    t.field('salesType', {
      type: 'salesType',
    });
    t.field('businessModel', {
      type: 'businessModel',
    });
    t.field('mainGoal', {
      type: 'mainGoal',
    });
  },
});

/* ===================================================================== */

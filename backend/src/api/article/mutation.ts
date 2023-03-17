/* eslint-disable sonarjs/no-identical-functions */
import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import { Context } from '../../graphql/context';

export const PostArticleMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    /*
    *
    * Post Article Mutations
    *
    */

    t.field('articleCreateMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: CreateArticleInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const article = await ctx.prisma.article.create({
          data: {
            post: {
              connect: {
                id: data.postId,
              },
            },
          },
        });

        await data.sections.map(async (element) => {
          await ctx.prisma.section.create({
            data: {
              article: {
                connect: {
                  id: article.id,
                },
              },
              number: element.number,
              type: element.type,
              text: element.text ? element.text : undefined,
              media: element.mediaURL
                ? {
                  connect: {
                    url: element.mediaURL,
                  },
                }
                : undefined,
            },
          });
        });

        return 'Success';
      },
    });

    t.field('articleUpdateMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: UpdateArticleInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const articleOld = await ctx.prisma.article.findUnique({
          where: {
            id: data.articleId,
          },
        });

        await ctx.prisma.article.delete({
          where: {
            id: data.articleId,
          },
        });

        const articleNew = await ctx.prisma.article.create({
          data: {
            post: {
              connect: {
                id: articleOld.postID,
              },
            },
          },
        });

        await data.sections.map(async (element) => {
          await ctx.prisma.section.create({
            data: {
              article: {
                connect: {
                  id: articleNew.id,
                },
              },
              number: element.number,
              type: element.type,
              text: element.text ? element.text : undefined,
              media: element.mediaURL
                ? {
                  connect: {
                    url: element.mediaURL,
                  },
                }
                : undefined,
            },
          });
        });

        return 'Success';
      },
    });

    t.field('articleDeleteMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: DeleteArticleInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await ctx.prisma.article.delete({
          where: {
            id: data.articleId,
          },
        });

        return 'Success';
      },
    });
  },
});

export const CrowdfundingArticleMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    /*
    *
    * Crowdfundin Story Mutations
    *
    */

    t.field('storyCreateMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: CreateStoryInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const story = await ctx.prisma.article.create({
          data: {
            crowdfunding: {
              connect: {
                id: data.crowdFundingId,
              },
            },
          },
        });

        await data.sections.map(async (element) => {
          await ctx.prisma.section.create({
            data: {
              article: {
                connect: {
                  id: story.id,
                },
              },
              number: element.number,
              type: element.type,
              text: element.text ? element.text : undefined,
              media: element.mediaURL
                ? {
                  connect: {
                    url: element.mediaURL,
                  },
                }
                : undefined,
            },
          });
        });

        return 'Success';
      },
    });

    t.field('storyUpdateMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: UpdateStoryInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const articleOld = await ctx.prisma.article.findUnique({
          where: {
            id: data.storyId,
          },
        });

        await ctx.prisma.article.delete({
          where: {
            id: data.storyId,
          },
        });

        const storyNew = await ctx.prisma.article.create({
          data: {
            crowdfunding: {
              connect: {
                id: articleOld.cfId,
              },
            },
          },
        });

        await data.sections.map(async (element) => {
          await ctx.prisma.section.create({
            data: {
              article: {
                connect: {
                  id: storyNew.id,
                },
              },
              number: element.number,
              type: element.type,
              text: element.text ? element.text : undefined,
              media: element.mediaURL
                ? {
                  connect: {
                    url: element.mediaURL,
                  },
                }
                : undefined,
            },
          });
        });

        return 'Success';
      },
    });

    t.field('storyDeleteMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: DeleteStoryInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await ctx.prisma.article.delete({
          where: {
            id: data.storyId,
          },
        });

        return 'Success';
      },
    });
  },
});

export const ProjectArticleMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    /*
    *
    * Project Description Mutations
    *
    */

    t.field('descriptionCreateMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: CreateDescriptionInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const description = await ctx.prisma.article.create({
          data: {
            project: {
              connect: {
                id: data.projectId,
              },
            },
          },
        });

        await data.sections.map(async (element) => {
          await ctx.prisma.section.create({
            data: {
              article: {
                connect: {
                  id: description.id,
                },
              },
              number: element.number,
              type: element.type,
              text: element.text ? element.text : undefined,
              media: element.mediaURL
                ? {
                  connect: {
                    url: element.mediaURL,
                  },
                }
                : undefined,
            },
          });
        });

        return 'Success';
      },
    });

    t.field('descriptionUpdateMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: UpdateDescriptionInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const descriptionOld = await ctx.prisma.article.findUnique({
          where: {
            id: data.descriptionId,
          },
        });

        await ctx.prisma.article.delete({
          where: {
            id: data.descriptionId,
          },
        });

        const descriptionNew = await ctx.prisma.article.create({
          data: {
            project: {
              connect: {
                id: descriptionOld.projectId,
              },
            },
          },
        });

        await data.sections.map(async (element) => {
          await ctx.prisma.section.create({
            data: {
              article: {
                connect: {
                  id: descriptionNew.id,
                },
              },
              number: element.number,
              type: element.type,
              text: element.text ? element.text : undefined,
              media: element.mediaURL
                ? {
                  connect: {
                    url: element.mediaURL,
                  },
                }
                : undefined,
            },
          });
        });

        return 'Success';
      },
    });

    t.field('descriptionDeleteMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: DeleteDescriptionInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await ctx.prisma.article.delete({
          where: {
            id: data.descriptionId,
          },
        });

        return 'Success';
      },
    });
  },
});

/*
*
* Post Article Input Objects
*
*/

export const CreateArticleInput = inputObjectType({
  name: 'CreateArticleInput',
  definition (t) {
    t.nonNull.int('postId');
    t.list.field('sections', {
      type: 'CreateSectionInput',
    });
  },
});

export const UpdateArticleInput = inputObjectType({
  name: 'UpdateArticleInput',
  definition (t) {
    t.nonNull.int('articleId');
    t.list.field('sections', {
      type: 'CreateSectionInput',
    });
  },
});

export const DeleteArticleInput = inputObjectType({
  name: 'DeleteArticleInput',
  definition (t) {
    t.nonNull.int('articleId');
  },
});

export const CreateSectionInput = inputObjectType({
  name: 'CreateSectionInput',
  definition (t) {
    t.nonNull.int('number');
    t.nonNull.field('type', {
      type: 'enumSectionType',
    });
    t.string('text');
    t.string('mediaURL');
  },
});

/*
*
* Crowdfunding Article(Story) Input Objects
*
*/

export const CreateStoryInput = inputObjectType({
  name: 'CreateStoryInput',
  definition (t) {
    t.nonNull.int('crowdFundingId');
    t.list.field('sections', {
      type: 'CreateStorySectionInput',
    });
  },
});

export const UpdateStoryInput = inputObjectType({
  name: 'UpdateStoryInput',
  definition (t) {
    t.nonNull.int('storyId');
    t.list.field('sections', {
      type: 'CreateStorySectionInput',
    });
  },
});

export const DeleteStoryInput = inputObjectType({
  name: 'DeleteStoryInput',
  definition (t) {
    t.nonNull.int('storyId');
  },
});

export const CreateStorySectionInput = inputObjectType({
  name: 'CreateStorySectionInput',
  definition (t) {
    t.nonNull.int('number');
    t.nonNull.field('type', {
      type: 'enumSectionType',
    });
    t.string('text');
    t.string('mediaURL');
  },
});

/*
*
* Project Article(Description) Input Objects
*
*/

export const CreateDescriptionInput = inputObjectType({
  name: 'CreateDescriptionInput',
  definition (t) {
    t.nonNull.int('projectId');
    t.list.field('sections', {
      type: 'CreateDescriptionSectionInput',
    });
  },
});

export const UpdateDescriptionInput = inputObjectType({
  name: 'UpdateDescriptionInput',
  definition (t) {
    t.nonNull.int('descriptionId');
    t.list.field('sections', {
      type: 'CreateDescriptionSectionInput',
    });
  },
});

export const DeleteDescriptionInput = inputObjectType({
  name: 'DeleteDescriptionInput',
  definition (t) {
    t.nonNull.int('descriptionId');
  },
});

export const CreateDescriptionSectionInput = inputObjectType({
  name: 'CreateDescriptionSectionInput',
  definition (t) {
    t.nonNull.int('number');
    t.nonNull.field('type', {
      type: 'enumSectionType',
    });
    t.string('text');
    t.string('mediaURL');
  },
});

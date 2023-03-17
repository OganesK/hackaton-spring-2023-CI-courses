import { extendType, arg, nonNull, inputObjectType } from 'nexus';
import { DEFAULT_IMAGE } from '../../config';
import { Context } from '../../graphql/context';

export const NewsMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOnePost', {
      type: 'Post',
      args: { data: nonNull(arg({ type: PostCreateInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const worker = await ctx.prisma.worker.findFirst({
          where: {
            project: {
              id: data.projectId,
            },
            worker: {
              id: ctx.user.id,
            },
          },
        });

        return ctx.prisma.post.create({
          data: {
            title: data.title,
            description: data.description,
            tags: {
              set: data.tags,
            },
            articleBody: data.articleBody,
            category: data.category,
            isOffer: data.isOffer,
            isResource: data.isResource,
            isNews: data.isNews,
            poster: {
              connect: {
                url: DEFAULT_IMAGE,
              },
            },
            project: {
              connect: {
                id: data.projectId,
              },
            },
            author: {
              connect: {
                id: worker.id,
              },
            },
          },
        });
      },
    });

    t.field('updatePost', {
      type: 'String',
      args: { data: nonNull(arg({ type: updatePostInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const postData = await ctx.prisma.post.findUnique({
          where: {
            id: data.postId,
          },
        });

        await ctx.prisma.post.update({
          where: {
            id: data.postId,
          },
          data: {
            moderationChecked: false,
            title: data.title !== null ? data.title : postData.title,
            tags: data.tags !== null ? data.tags : postData.tags,
            category: data.category !== null ? data.category : postData.category,
            articleBody: data.articleBody !== null ? data.articleBody : postData.articleBody,
            description: data.description !== null ? data.description : postData.description,
          },
        });

        return 'Succes!';
      },
    });

    t.crud.deleteOnePost();

    /* ===================================================================== */

    t.field('postCreateMutation', {
      type: 'Post',
      args: { data: nonNull(arg({ type: CreatePostInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const worker = await ctx.prisma.worker.findFirst({
          where: {
            project: {
              id: data.projectId,
            },
            worker: {
              id: ctx.user.id,
            },
          },
        });

        return ctx.prisma.post.create({
          data: {
            title: data.title,
            description: data.description,
            tags: {
              set: data.tags,
            },
            category: data.category,
            isOffer: data.isOffer,
            isResource: data.isResource,
            isNews: data.isNews,
            poster: {
              connect: {
                url: DEFAULT_IMAGE,
              },
            },
            project: {
              connect: {
                id: data.projectId,
              },
            },
            author: {
              connect: {
                id: worker.id,
              },
            },
          },
        });
      },
    });

    t.field('postUpdateMutation', {
      type: 'String',
      args: { data: nonNull(arg({ type: UpdatePostInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const postData = await ctx.prisma.post.findUnique({
          where: {
            id: data.postId,
          },
        });

        await ctx.prisma.post.update({
          where: {
            id: data.postId,
          },
          data: {
            moderationChecked: false,
            title: data.title !== null ? data.title : postData.title,
            tags: data.tags !== null ? data.tags : postData.tags,
            category: data.category !== null ? data.category : postData.category,
            description: data.description !== null ? data.description : postData.description,
          },
        });

        return 'Succes!';
      },
    });
  },
});

export const updatePostInput = inputObjectType({
  name: 'updatePostInput',
  definition (t) {
    t.nonNull.int('postId');
    t.string('title');
    t.list.string('tags');
    t.string('articleBody');
    t.string('description');
    t.field('category', {
      type: 'filteringCategoies',
    });
  },
});

export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition (t) {
    t.nonNull.string('title');
    t.nonNull.list.string('tags');
    t.nonNull.string('articleBody');
    t.nonNull.string('description');
    t.nonNull.boolean('isOffer');
    t.nonNull.boolean('isResource');
    t.nonNull.boolean('isNews');
    t.nonNull.field('category', {
      type: 'filteringCategoies',
    });
    t.nonNull.int('projectId');
  },
});

/* ===================================================================== */

export const CreatePostInput = inputObjectType({
  name: 'CreatePostInput',
  definition (t) {
    t.nonNull.string('title');
    t.nonNull.list.string('tags');
    t.nonNull.string('description');
    t.nonNull.boolean('isOffer');
    t.nonNull.boolean('isResource');
    t.nonNull.boolean('isNews');
    t.nonNull.field('category', {
      type: 'filteringCategoies',
    });
    t.nonNull.int('projectId');
  },
});

export const UpdatePostInput = inputObjectType({
  name: 'UpdatePostInput',
  definition (t) {
    t.nonNull.int('postId');
    t.string('title');
    t.list.string('tags');
    t.string('description');
    t.field('category', {
      type: 'filteringCategoies',
    });
  },
});

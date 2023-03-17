import { arg, extendType, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../graphql/context';

export const PostQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.post();
    t.crud.posts({
      filtering: true,
      ordering: true,
    });
    t.field('postQuery', {
      type: 'Post',
      args: { data: nonNull(arg({ type: postQueryInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.post.findUnique({
          where: {
            id: data.postId,
          },
          include: {
            article: {
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

export const postQueryInput = inputObjectType({
  name: 'postQueryInput',
  definition (t) {
    t.int('postId');
  },
});

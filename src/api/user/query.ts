import { extendType, inputObjectType, nonNull, arg, list } from 'nexus';
import { Context } from '../../graphql/context';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('user', {
      args: { data: nonNull(arg({ type: UserQueryInput })) },
      type: 'User',
      resolve: async (parent, args, ctx: Context) => {
        try {
          const user = await ctx.prisma.user.findFirst({
            where: {
              id: args.data.id,
            },
          });

          if (!user) {
            throw new Error('User with provided id does not exist');
          }
          return user;
        } catch (error) {
          throw new Error(error);
        }
      },
    });
    t.field('users', {
      args: {},
      type: list('User'),
      resolve: async (parent, args, ctx: Context) => {
        try {
          return await ctx.prisma.user.findMany({});
        } catch (error) {
          throw new Error(error);
        }
      },
    });

    t.field('me', {
      type: 'User',
      args: {},
      resolve: async (_, {}, { user }) => {
        return user;
      },
    });
  },
});

export const UserQueryInput = inputObjectType({
  name: 'UserQueryInput',
  definition (t) {
    t.nonNull.string('id');
  },
});

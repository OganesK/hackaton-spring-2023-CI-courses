import { extendType } from 'nexus';
import { Context } from '../../graphql/context';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.user();
    t.crud.users({
      filtering: true,
      ordering: true,
    });

    t.field('me', {
      type: 'User',
      args: {},
      resolve: async (_, { }, { user }) => {
        return user;
      },
    });
    t.list.field('myNotification', {
      type: 'Notification',
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.notification.findMany({
          where: {
            toWhomId: ctx.user.id,
          },
        });
      },
    });
  },
});

import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import { GraphQLError } from 'graphql';
import { Context } from '../../graphql/context';

export const MessageQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getMessageInGroup', {
      type: 'MessagerGroup',
      args: { data: nonNull(arg({ type: getMessageInGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const group = await ctx.prisma.messagerGroup.findUnique({
          where: {
            id: data.groupId,
          },
          include: {
            messages: true,
            members: true,
          },
        });

        if (group.members.find((elem) => JSON.stringify(elem) === JSON.stringify(ctx.user))) {
          return group;
        }

        throw new GraphQLError('Access denied');
      },
    });

    t.list.field('getMessageInStream', {
      type: 'StreamMessage',
      args: { data: nonNull(arg({ type: getMessageInStreamInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const stream = await ctx.prisma.stream.findUnique({
          where: {
            id: data.streamId,
          },
          include: {
            streamMessage: true,
          },
        });

        return stream.streamMessage;
      },
    });

    t.list.field('getMyGroups', {
      type: 'MessagerGroup',
      resolve: async (_, { }, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
          select: {
            groups: {
              include: {
                admins: true,
              },
            },
          },
        });

        return user.groups;
      },
    });
    t.list.field('getUsersInGroup', {
      type: 'User',
      args: { data: nonNull(arg({ type: getUsersInGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const members = await ctx.prisma.messagerGroup.findUnique({
          where: {
            id: data.groupId,
          },
          include: {
            members: true,
          },
        });

        return members.members;
      },
    });
    t.list.field('getUsersWhichCanAddToGroup', {
      type: 'User',
      args: { data: nonNull(arg({ type: getUsersWhichCantAddToGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const group = await ctx.prisma.messagerGroup.findUnique({
          where: {
            id: data.groupId,
          },
        });

        return ctx.prisma.user.findMany({
          where: {
            groups: {
              none: {
                id: group.id,
              },
            },
          },
        });
      },
    });
  },
});

export const getMessageInGroupInput = inputObjectType({
  name: 'getMessageInGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
  },
});

export const getMessageInStreamInput = inputObjectType({
  name: 'getMessageInStreamInput',
  definition (t) {
    t.nonNull.int('streamId');
  },
});

export const getUsersInGroupInput = inputObjectType({
  name: 'getUsersInGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
  },
});

export const getUsersWhichCantAddToGroupInput = inputObjectType({
  name: 'getUsersWhichCantAddToGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
  },
});

import { arg, extendType, nonNull, inputObjectType } from 'nexus';
import cuid from 'cuid';
import pubsub from '../../pubsub';
import { Context } from '../../graphql/context';
import { BASE_URL } from '../../config';
import { MessagerGroup } from '.prisma/client';

export const MessageMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    /* CRUD Group */

    t.field('switchToMessager', {
      type: 'MessagerGroup',
      args: { data: nonNull(arg({ type: switchToMessagerInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const secret = cuid();
        const url = `${BASE_URL}/groupinvite?uid=${secret}`;

        const groupSender: MessagerGroup[] = await ctx.prisma.user.findUnique({
          where: {
            id: data.senderId,
          },
        }).groups();

        const groupRecipient: MessagerGroup[] = await ctx.prisma.user.findUnique({
          where: {
            id: data.recipientId,
          },
        }).groups();

        const results = groupSender.filter(({ id: id1 }) => groupRecipient.some(({ id: id2 }) => id2 === id1));

        if (!results[0]) {
          const createdGroup = await ctx.prisma.messagerGroup.create({
            data: {
              title: 'Test',
              type: 'private',
              inviteURL: url,
              members: {
                connect: [{ id: data.senderId }, { id: data.recipientId }],
              },
              admins: {
                connect: [
                  {
                    id: data.recipientId,
                  },
                  {
                    id: data.senderId,
                  },
                ],
              },
            },
          });

          return ctx.prisma.messagerGroup.findUnique({
            where: {
              id: createdGroup.id,
            },
          });
        }

        return ctx.prisma.messagerGroup.findUnique({
          where: {
            id: results[0].id,
          },
        });
      },
    });

    t.field('createGroup', {
      type: 'MessagerGroup',
      args: { data: nonNull(arg({ type: createGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const secret = cuid();
        const url = `${BASE_URL}/groupinvite?uid=${secret}`;

        const group = await ctx.prisma.messagerGroup.create({
          data: {
            title: data.title,
            type: 'public',
            inviteURL: url,
            members: {
              connect: {
                id: ctx.user.id,
              },
            },
            admins: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        });

        if (data.membersIds) {
          await data.membersIds.forEach(async (element) => {
            await ctx.prisma.messagerGroup.update({
              where: {
                id: group.id,
              },
              data: {
                members: {
                  connect: {
                    id: element,
                  },
                },
              },
            });
          });
        }

        return ctx.prisma.messagerGroup.findUnique({
          where: {
            id: group.id,
          },
        });
      },
    });

    t.field('updateGroup', {
      type: 'MessagerGroup',
      args: { data: nonNull(arg({ type: updateGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const groupOld = await ctx.prisma.messagerGroup.findUnique({
          where: {
            id: data.groupId,
          },
        });

        return ctx.prisma.messagerGroup.update({
          where: {
            id: data.groupId,
          },
          data: {
            title: data.title !== null ? data.title : groupOld.title,
          },
        });
      },
    });

    t.field('deleteGroup', {
      type: 'String',
      args: { data: nonNull(arg({ type: deleteGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await ctx.prisma.messagerGroup.delete({
          where: {
            id: data.groupId,
          },
        });

        return 'Success';
      },
    });

    /* ========================== */

    /* Work with Members */

    t.field('addMembersToGroup', {
      type: 'String',
      args: { data: nonNull(arg({ type: addMembersToGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await data.membersIds.forEach(async (element) => {
          await ctx.prisma.messagerGroup.update({
            where: {
              id: data.groupId,
            },
            data: {
              members: {
                connect: {
                  id: element,
                },
              },
            },
          });
        });

        return 'Success';
      },
    });

    t.field('removeMembersFromGroup', {
      type: 'String',
      args: { data: nonNull(arg({ type: removeMembersFromGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await data.membersIds.forEach(async (element) => {
          await ctx.prisma.messagerGroup.update({
            where: {
              id: data.groupId,
            },
            data: {
              members: {
                disconnect: {
                  id: element,
                },
              },
            },
          });
        });

        return 'Success';
      },
    });

    // Make Group Admin

    t.field('setGroupAdmin', {
      type: 'String',
      args: { data: nonNull(arg({ type: setGroupAdminInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await data.membersIds.forEach(async (element) => {
          await ctx.prisma.messagerGroup.update({
            where: {
              id: data.groupId,
            },
            data: {
              admins: {
                connect: {
                  id: element,
                },
              },
            },
          });
        });

        return 'Success';
      },
    });

    // Remove Group Admin

    t.field('removeGroupAdmin', {
      type: 'String',
      args: { data: nonNull(arg({ type: removeGroupAdminInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await data.membersIds.forEach(async (element) => {
          await ctx.prisma.messagerGroup.update({
            where: {
              id: data.groupId,
            },
            data: {
              admins: {
                disconnect: {
                  id: element,
                },
              },
            },
          });
        });

        return 'Success';
      },
    });

    // Leave from group

    t.field('leaveFromGroup', {
      type: 'String',
      args: { data: nonNull(arg({ type: leaveFromGroupInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        await ctx.prisma.messagerGroup.update({
          where: {
            id: data.groupId,
          },
          data: {
            members: {
              disconnect: {
                id: ctx.user.id,
              },
            },
          },
        });

        return 'Success';
      },
    });

    /* ========================== */

    /* Messages */

    t.field('sendMessage', {
      type: 'Message',
      args: { data: nonNull(arg({ type: sendMessageInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const message = await ctx.prisma.message.create({
          data: {
            text: data.text,
            sender: {
              connect: {
                id: data.senderId,
              },
            },
            group: {
              connect: {
                id: data.groupId,
              },
            },
          },
          include: {
            sender: true,
          },
        });

        await pubsub.publish(`MESSAGE_SENDED_${data.groupId}`, { newMessage: message });

        return message;
      },
    });

    t.field('sendStreamMessage', {
      type: 'StreamMessage',
      args: { data: nonNull(arg({ type: sendStreamMessageInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const message = await ctx.prisma.streamMessage.create({
          data: {
            text: data.text,
            sender: {
              connect: {
                id: data.senderId,
              },
            },
            stream: {
              connect: {
                id: data.streamId,
              },
            },
          },
          include: {
            sender: true,
          },
        });

        await pubsub.publish(`STREAM_MESSAGE_SENDED_${data.streamId}`, { newMessage: message });

        return message;
      },
    });

    /* ========================== */
  },
});

/* CRUD Group */

export const switchToMessagerInput = inputObjectType({
  name: 'switchToMessagerInput',
  definition (t) {
    t.nonNull.int('senderId');
    t.nonNull.int('recipientId');
  },
});

export const createGroupInput = inputObjectType({
  name: 'createGroupInput',
  definition (t) {
    t.nonNull.string('title');
    t.list.int('membersIds');
  },
});

export const updateGroupInput = inputObjectType({
  name: 'updateGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
    t.string('title');
  },
});

export const deleteGroupInput = inputObjectType({
  name: 'deleteGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
  },
});

/* =================================================== */

/* Work with Members */

export const createInviteInput = inputObjectType({
  name: 'createInviteInput',
  definition (t) {
    t.nonNull.int('groupId');
  },
});

export const addMembersToGroupInput = inputObjectType({
  name: 'addMembersToGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
    t.list.int('membersIds');
  },
});

export const removeMembersFromGroupInput = inputObjectType({
  name: 'removeMembersFromGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
    t.list.int('membersIds');
  },
});

export const setGroupAdminInput = inputObjectType({
  name: 'setGroupAdminInput',
  definition (t) {
    t.nonNull.int('groupId');
    t.list.nonNull.int('membersIds');
  },
});

export const removeGroupAdminInput = inputObjectType({
  name: 'removeGroupAdminInput',
  definition (t) {
    t.nonNull.int('groupId');
    t.list.nonNull.int('membersIds');
  },
});

export const removeMemberFromGroupInput = inputObjectType({
  name: 'removeMemberFromGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
    t.nonNull.int('memberId');
  },
});

export const leaveFromGroupInput = inputObjectType({
  name: 'leaveFromGroupInput',
  definition (t) {
    t.nonNull.int('groupId');
  },
});

/* =================================================== */

export const sendMessageInput = inputObjectType({
  name: 'sendMessageInput',
  definition (t) {
    t.nonNull.string('text');
    t.nonNull.int('senderId');
    t.nonNull.int('groupId');
  },
});

/* =================================================== */

export const sendStreamMessageInput = inputObjectType({
  name: 'sendStreamMessageInput',
  definition (t) {
    t.nonNull.string('text');
    t.nonNull.int('senderId');
    t.nonNull.int('streamId');
  },
});

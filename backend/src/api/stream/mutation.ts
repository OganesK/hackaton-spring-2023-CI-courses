import { extendType, inputObjectType, nonNull, arg } from 'nexus';
import { GraphQLError } from 'graphql';
import { uuid } from 'uuidv4';

import { Context } from '../../graphql/context';

export const StreamMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('createStream', {
      type: 'Stream',
      args: { data: nonNull(arg({ type: createStreamArgs })) },
      resolve: async (_, { data }, ctx: Context) => {
        const existingStream = await ctx.prisma.stream.findUnique({
          where: {
            eventId: data.eventId,
          },
        });

        if (existingStream) {
          throw new GraphQLError('Stream already exists on provided event');
        }

        return ctx.prisma.stream.create({
          data: {
            eventId: data.eventId,
          },
        });
      },
    });
    t.field('updateStream', {
      type: 'Stream',
      args: { data: nonNull(arg({ type: createStreamArgs })) },
      resolve: async (_, { data }, ctx: Context) => {
        const existingStream = await ctx.prisma.stream.findUnique({
          where: {
            eventId: data.eventId,
          },
        });

        if (!existingStream) {
          throw new GraphQLError('Stream doesnt exist on provided event');
        }

        return ctx.prisma.stream.update({
          where: {
            eventId: data.eventId,
          },
          data: {
            streamKey: uuid(),
          },
        });
      },
    });
    t.field('updateStreamActivity', {
      type: 'Stream',
      args: { data: nonNull(arg({ type: updateStreamActivityArgs })) },
      resolve: async (_, { data }, ctx: Context) => {
        const existingStream = await ctx.prisma.stream.findUnique({
          where: {
            id: data.streamId,
          },
        });

        if (!existingStream) {
          throw new GraphQLError('Stream doesnt exist on provided event');
        }

        return ctx.prisma.stream.update({
          where: {
            id: data.streamId,
          },
          data: {
            active: !existingStream.active,
          },
        });
      },
    });
  },
});

export const createStreamArgs = inputObjectType({
  name: 'createStreamArgs',
  definition (t) {
    t.int('eventId');
  },
});

export const updateStreamActivityArgs = inputObjectType({
  name: 'updateStreamActivityArgs',
  definition (t) {
    t.int('streamId');
  },
});

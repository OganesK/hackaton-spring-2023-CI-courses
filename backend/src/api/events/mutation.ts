import { arg, extendType, inputObjectType, nonNull } from 'nexus';
import { DEFAULT_IMAGE } from '../../config';
import { Context } from '../../graphql/context';

export const EventMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOneEvent', {
      type: 'Event',
      args: { data: nonNull(arg({ type: EventCreatedInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.event.create({
          data: {
            name: data.name,
            description: data.description,
            shortDescription: data.shortDescription,
            date: data.date,
            organizer: data.organizer,
            theme: data.theme,
            address: data.address,
            format: data.format,
            user: {
              connect: {
                id: ctx.user.id,
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

    t.field('updateOneEvent', {
      type: 'String',
      args: { data: nonNull(arg({ type: EventUpdatedInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const eventData = await ctx.prisma.event.findUnique({
          where: {
            id: data.eventId,
          },
        });

        await ctx.prisma.event.update({
          where: {
            id: data.eventId,
          },
          data: {
            name: data.name !== null ? data.name : eventData.name,
            description: data.description !== null ? data.description : eventData.description,
            shortDescription: data.shortDescription !== null ? data.shortDescription : eventData.shortDescription,
            organizer: data.organizer !== null ? data.organizer : eventData.organizer,
            theme: data.theme !== null ? data.theme : eventData.theme,
            address: data.address !== null ? data.address : eventData.address,
            date: data.date !== null ? data.date : eventData.date,
            format: data.format !== null ? data.format : eventData.format,
          },
        });

        return 'Success!';
      },
    });

    t.field('registerForEvent', {
      type: 'String',
      args: { data: nonNull(arg({ type: RegisterForEventInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const registerExist = await ctx.prisma.registeredForEvent.findFirst({
          where: {
            eventId: data.eventId,
            email: data.email,
            name: data.name,
            surname: data.surname,
          },
        });

        if (registerExist) {
          await ctx.prisma.registeredForEvent.update({
            where: {
              id: registerExist.id,
            },
            data: {
            },
          });
        } else {
          await ctx.prisma.registeredForEvent.create({
            data: {
              name: data.name,
              surname: data.surname,
              email: data.email,
              event: {
                connect: {
                  id: data.eventId,
                },
              },
            },
          });
        }

        return 'Success';
      },
    });

    t.crud.deleteOneEvent();
  },
});

export const EventCreatedInput = inputObjectType({
  name: 'EventCreatedInput',
  definition (t) {
    t.nonNull.string('name');
    t.nonNull.string('shortDescription');
    t.nonNull.string('description');
    t.nonNull.string('organizer');
    t.nonNull.string('theme');
    t.string('address');
    t.string('format');
    t.nonNull.field('category', {
      type: 'filteringCategoies',
    });
    t.nonNull.field('date', { type: 'DateTime' });
  },
});

export const EventUpdatedInput = inputObjectType({
  name: 'EventUpdatedInput',
  definition (t) {
    t.nonNull.int('eventId');
    t.string('name');
    t.string('shortDescription');
    t.string('description');
    t.string('organizer');
    t.string('theme');
    t.string('address');
    t.string('format');
    t.field('category', {
      type: 'filteringCategoies',
    });
    t.field('date', { type: 'DateTime' });
  },
});

export const RegisterForEventInput = inputObjectType({
  name: 'RegisterForEventInput',
  definition (t) {
    t.nonNull.int('eventId');
    t.nonNull.string('name');
    t.nonNull.string('surname');
    t.nonNull.string('email');
    t.field('verdict', {
      type: 'registeredVerdict',
    });
  },
});

import { objectType } from 'nexus';
import { DEFAULT_IMAGE } from '../../config';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const Event = objectType({
  name: 'Event',
  definition (t) {
    t.model.id();
    t.model.moderationChecked();
    t.model.name();
    t.field('poster', {
      type: 'Media',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.posterId === null) {
          const event = await ctx.prisma.event.update({
            where: {
              id: parent.id,
            },
            data: {
              poster: {
                connect: {
                  url: DEFAULT_IMAGE,
                },
              },
            },
            include: {
              poster: true,
            },
          });

          return event.poster;
        }

        return ctx.prisma.media.findUnique({
          where: {
            id: parent.posterId,
          },
        });
      },
    });
    t.model.category();
    t.model.description();
    t.model.shortDescription();
    t.model.isApproved();
    t.model.date();
    t.model.organizer();
    t.model.address();
    t.model.theme();
    t.model.format();
    t.model.platformConfigShowed();
    t.model.moderate();
    t.model.user();
    t.model.address();
    t.model.stream();
  },
});

export const RegisteredForEvent = objectType({
  name: 'RegisteredForEvent',
  definition (t) {
    t.model.id();
    t.model.verdict();
    t.model.name();
    t.model.surname();
    t.model.email();
    t.model.event();
  },
});

export const SignUrlEventPoster = objectType({
  name: 'SignUrlEventPoster',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

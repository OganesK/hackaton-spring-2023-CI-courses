import { objectType } from 'nexus';
import { DEFAULT_IMAGE } from '../../config';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const Course = objectType({
  name: 'Course',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.name();
    t.field('poster', {
      type: 'Media',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.posterId === null) {
          const project = await ctx.prisma.course.update({
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

          return project.poster;
        }

        return ctx.prisma.media.findUnique({
          where: {
            id: parent.posterId,
          },
        });
      },
    });
    t.model.description();
    t.model.shortDescription();
    t.model.publishedPosts({
      ordering: true,
    });
  },
});
export const SignUrlProjectPresentationMedia = objectType({
  name: 'SignUrlProjectPresentationMedia',
  definition(t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

export const SignUrlProjectPoster = objectType({
  name: 'SignUrlProjectPoster',
  definition(t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

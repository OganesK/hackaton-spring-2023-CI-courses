import { objectType, enumType } from 'nexus';
import { DEFAULT_IMAGE } from '../../config';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const Post = objectType({
  name: 'Post',
  definition (t) {
    t.model.id();
    t.model.moderationChecked();
    t.model.createdAt();
    t.model.author();
    t.model.title();
    t.model.isOffer();
    t.model.isResource();
    t.model.isNews();
    t.model.category();
    t.field('poster', {
      type: 'Media',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.posterId === null) {
          const post = await ctx.prisma.post.update({
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

          return post.poster;
        }

        return ctx.prisma.media.findUnique({
          where: {
            id: parent.posterId,
          },
        });
      },
    });
    t.model.tags();
    t.model.description();
    t.model.articleBody();
    t.model.article();
    t.model.rejectMessage();
    t.model.project();
    t.model.platformConfigNewsShowed();
    t.model.platformConfigOffersShowed();
    t.model.isApproved();
    t.model.moderate();
    t.model.postMedia();
  },
});

export const SignUrlPostPoster = objectType({
  name: 'SignUrlPostPoster',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

export const enumPostCategory = enumType({
  name: 'enumPostCategory',
  members: ['news', 'resource', 'offer'],
});

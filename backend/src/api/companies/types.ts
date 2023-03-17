import { objectType } from 'nexus';
import { DEFAULT_IMAGE } from '../../config';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const Company = objectType({
  name: 'Company',
  definition (t) {
    t.model.id();
    t.model.moderationChecked();
    t.model.createdAt();
    t.model.name();
    t.field('avatar', {
      type: 'Media',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.avatarId === null) {
          const company = await ctx.prisma.company.update({
            where: {
              id: parent.id,
            },
            data: {
              avatar: {
                connect: {
                  url: DEFAULT_IMAGE,
                },
              },
            },
            include: {
              avatar: true,
            },
          });

          return company.avatar;
        }

        return ctx.prisma.media.findUnique({
          where: {
            id: parent.avatarId,
          },
        });
      },
    });
    t.model.description();
    t.model.shortDescription();
    t.model.activityKind();
    t.model.owner();
    t.model.contact();
    t.model.projects();
    t.model.isApproved();
    t.model.moderate();
    t.model.inn();
    t.model.mainRegion();
    t.model.mainContact();
  },
});

export const SignUrlCompanyAvatar = objectType({
  name: 'SignUrlCompanyAvatar',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

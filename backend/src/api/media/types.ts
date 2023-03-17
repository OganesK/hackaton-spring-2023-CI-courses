import { enumType, objectType } from 'nexus';
import { Context } from '../../graphql/context';
import * as awsS3API from '../../integrations/aws/s3';

export * from './query';
export * from './mutation';

export const Media = objectType({
  name: 'Media',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.type();
    t.model.user();
    t.model.company();
    t.model.projectPoster();
    t.model.projectMedia();
    t.model.event();
    t.model.post();
    t.model.postMedia();
    t.model.projectDescripiton();
    t.model.crowdfundingStory();
    t.field('link', {
      type: 'String',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.isApproved === false) {
          const fileName = `${parent?.url.split('/')[3]}/${parent?.url.split('/')[3]}.${parent?.url.split('.')[5]}`;
          const exist = !!await awsS3API.objectExist({ fileName });

          if (exist) {
            await ctx.prisma.media.update({
              where: {
                id: parent.id,
              },
              data: {
                isApproved: true,
              },
            });

            return parent.url;
          }
          await ctx.prisma.media.delete({
            where: {
              id: parent.id,
            },
          });

          return 'Object doesn\'t exist';
        }

        return parent.url;
      },
    });
  },
});

export const SignUrlResponse = objectType({
  name: 'SignUrlResponse',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
    t.int('mediaId');
    t.string('mediaURL');
  },
});

export const entityTypes = enumType({
  name: 'entityTypes',
  members: ['crowdfundingStory', 'projectDescription', 'crowdFundingPoster', 'groupAvatar', 'userAvatar', 'companyAvatar', 'projectPoster', 'projectMedia', 'eventPoster', 'postPoster', 'postMedia'],
});

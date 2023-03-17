/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-identical-functions */
import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import { GraphQLError } from 'graphql';
import url from 'url-parse';
import cuid from 'cuid';
import * as awsS3API from '../../integrations/aws/s3';
import { Context } from '../../graphql/context';

export const MediaMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createMedia', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: createMediaInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const fileName = await cuid();

        const result = await awsS3API.getSignedUrl({ fileName, type: data.fileType });

        const media = await ctx.prisma.media.create({
          data: {
            url: result.objectURL,
            type: data.fileType === 'video/mp4' ? 'video' : 'image',
          },
        });

        if (data.entityType !== undefined) {
          switch (data.entityType) {
            case 'userAvatar': {
              await ctx.prisma.user.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  avatar: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'eventPoster': {
              await ctx.prisma.event.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  poster: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'postPoster': {
              await ctx.prisma.post.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  poster: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'postMedia': {
              await ctx.prisma.post.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  postMedia: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'groupAvatar': {
              await ctx.prisma.messagerGroup.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  avatar: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'projectDescription': {
              await ctx.prisma.course.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  courseMedia: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            default: {
              break;
            }
          }
        }

        return {
          fileName: result.fileName,
          signedURL: result.signedURL,
          mediaId: media.id,
          mediaURL: media.url,
        };
      },
    });

    t.field('deleteMediaElement', {
      type: 'String',
      args: { data: nonNull(arg({ type: deleteMediaElementInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const media = url(data.mediaURL);

        await awsS3API.deleteObject({ fileName: media.pathname.substr(1) });

        await ctx.prisma.media.delete({
          where: {
            url: data.mediaURL,
          },
        });

        return 'Success!';
      },
    });

    t.field('putUserAvatar', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: getMediaDataInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        if (await awsS3API.objectType({ type: data.fileType }) === false) {
          throw new GraphQLError('Not supported mimetype!');
        }

        const result = await awsS3API.getSignedUrl({ fileName: data.fileName, type: data.fileType });

        await ctx.prisma.media.create({
          data: {
            user: {
              connect: {
                id: data.entityId,
              },
            },
            url: result.objectURL,
            type: 'image',
          },
        });

        return result;
      },
    });
    t.field('putEventPoster', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: getMediaDataInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        if (await awsS3API.objectType({ type: data.fileType }) === false) {
          throw new GraphQLError('Not supported mimetype!');
        }

        const result = await awsS3API.getSignedUrl({ fileName: data.fileName, type: data.fileType });

        await ctx.prisma.media.create({
          data: {
            event: {
              connect: {
                id: data.entityId,
              },
            },
            url: result.objectURL,
            type: 'image',
          },
        });

        return result;
      },
    });
    t.field('putPostPoster', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: getMediaDataInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        if (await awsS3API.objectType({ type: data.fileType }) === false) {
          throw new GraphQLError('Not supported mimetype!');
        }

        const result = await awsS3API.getSignedUrl({ fileName: data.fileName, type: data.fileType });

        await ctx.prisma.media.create({
          data: {
            post: {
              connect: {
                id: data.entityId,
              },
            },
            url: result.objectURL,
            type: 'image',
          },
        });

        return result;
      },
    });
    t.field('putPostMedia', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: getMediaDataInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        if (await awsS3API.objectType({ type: data.fileType }) === false) {
          throw new GraphQLError('Not supported mimetype!');
        }

        const result = await awsS3API.getSignedUrl({ fileName: data.fileName, type: data.fileType });

        await ctx.prisma.media.create({
          data: {
            postMedia: {
              connect: {
                id: data.entityId,
              },
            },
            url: result.objectURL,
            type: data.fileType === 'video/mp4' ? 'video' : 'image',
          },
        });

        return result;
      },
    });
    t.field('deletePostMedia', {
      type: 'String',
      args: { data: nonNull(arg({ type: deletePostMedia })) },
      resolve: async (_, { data }, ctx: Context) => {
        const media = url(data.mediaUrl);

        await awsS3API.deleteObject({ fileName: media.pathname.substr(1) });

        await ctx.prisma.media.delete({
          where: {
            url: data.mediaUrl,
          },
        });

        return 'Success!';
      },
    });
    t.field('putProjectPoster', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: getMediaDataInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        if (await awsS3API.objectType({ type: data.fileType }) === false) {
          throw new GraphQLError('Not supported mimetype!');
        }

        const result = await awsS3API.getSignedUrl({ fileName: data.fileName, type: data.fileType });

        await ctx.prisma.media.create({
          data: {
            courseMedia: {
              connect: {
                id: data.entityId,
              },
            },
            url: result.objectURL,
            type: 'image',
          },
        });

        return result;
      },
    });
    t.field('putProjectPresentationMedia', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: getMediaDataInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        if (await awsS3API.objectType({ type: data.fileType }) === false) {
          throw new GraphQLError('Not supported mimetype!');
        }

        const result = await awsS3API.getSignedUrl({ fileName: data.fileName, type: data.fileType });

        await ctx.prisma.media.create({
          data: {
            courseMedia: {
              connect: {
                id: data.entityId,
              },
            },
            url: result.objectURL,
            type: data.fileType === 'video/mp4' ? 'video' : 'image',
          },
        });

        return result;
      },
    });
    t.field('deleteProjectPresentationMedia', {
      type: 'String',
      args: { data: nonNull(arg({ type: deleteProjectPresentationMedia })) },
      resolve: async (_, { data }, ctx: Context) => {
        const media = url(data.mediaUrl);

        await awsS3API.deleteObject({ fileName: media.pathname.substr(1) });

        await ctx.prisma.media.delete({
          where: {
            url: data.mediaUrl,
          },
        });

        return 'Success!';
      },
    });
  },
});

export const getMediaDataInput = inputObjectType({
  name: 'getMediaDataInput',
  definition(t) {
    t.int('entityId');
    t.string('fileName');
    t.string('fileType');
  },
});

export const deleteProjectPresentationMedia = inputObjectType({
  name: 'deleteProjectPresentationMedia',
  definition(t) {
    t.nonNull.string('mediaUrl');
  },
});

export const deleteMediaElementInput = inputObjectType({
  name: 'deleteMediaElementInput',
  definition(t) {
    t.nonNull.string('mediaURL');
  },
});

export const deletePostMedia = inputObjectType({
  name: 'deletePostMedia',
  definition(t) {
    t.nonNull.string('mediaUrl');
  },
});

export const createMediaInput = inputObjectType({
  name: 'createMediaInput',
  definition(t) {
    t.nonNull.string('fileType');
    t.int('entityId');
    t.field('entityType', {
      type: 'entityTypes',
    });
  },
});

export const connectMediaInput = inputObjectType({
  name: 'connectMediaInput',
  definition(t) {
    t.nonNull.int('entityId');
    t.nonNull.string('mediaURL');
    t.nonNull.field('entityType', {
      type: 'entityTypes',
    });
  },
});

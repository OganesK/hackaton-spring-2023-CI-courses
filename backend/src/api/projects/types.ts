import { objectType } from 'nexus';
import { DEFAULT_IMAGE } from '../../config';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const Project = objectType({
  name: 'Project',
  definition (t) {
    t.model.id();
    t.model.moderationChecked();
    t.model.createdAt();
    t.model.name();
    t.model.category();
    t.model.projectType();
    t.model.projectStage();
    t.model.projectSite();
    t.model.projectMarket();
    t.model.technologyType();
    t.model.investmentStage();
    t.model.salesType();
    t.model.businessModel();
    t.model.mainGoal();
    t.model.workers();
    t.field('poster', {
      type: 'Media',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.posterId === null) {
          const project = await ctx.prisma.project.update({
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
    t.model.presentationMedia();
    t.model.description();
    t.model.shortDescription();
    t.model.metrics();
    t.model.ownerCompany();
    t.model.crowdFunding();
    t.model.workers();
    t.model.publishedPosts({
      ordering: true,
    });
    t.model.isApproved();
    t.model.moderate();
    t.model.projectMedia();
  },
});

export const ProjectMetrics = objectType({
  name: 'ProjectMetrics',
  definition (t) {
    t.model.id();
    t.model.workersCount();
    t.model.earned();
    t.model.investmentsGot();
    t.model.project();
  },
});

export const SignUrlProjectPresentationMedia = objectType({
  name: 'SignUrlProjectPresentationMedia',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

export const SignUrlProjectPoster = objectType({
  name: 'SignUrlProjectPoster',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

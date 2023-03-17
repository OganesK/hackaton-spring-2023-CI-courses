import { extendType } from 'nexus';
import { Context } from '../../graphql/context';

export const VerificationQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllNonVerificatedPosts', {
      type: 'Post',
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.post.findMany({
          where: {
            isApproved: false,
            moderationChecked: false,
          },
        });
      },
    });
    t.list.field('getAllNonVerificatedEvents', {
      type: 'Event',
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.event.findMany({
          where: {
            isApproved: false,
            moderationChecked: false,
          },
        });
      },
    });
    t.list.field('getAllNonVerificatedProjects', {
      type: 'Project',
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.project.findMany({
          where: {
            isApproved: false,
            moderationChecked: false,
          },
        });
      },
    });
    t.list.field('getAllNonVerificatedCompanies', {
      type: 'Company',
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.company.findMany({
          where: {
            isApproved: false,
            moderationChecked: false,
          },
        });
      },
    });
    t.list.field('getAllNonVerificatedContacts', {
      type: 'Contact',
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.contact.findMany({
          where: {
            isApproved: false,
            moderationChecked: false,
          },
        });
      },
    });
    t.list.field('getAllNonVerificatedCrowdFunding', {
      type: 'CrowdFunding',
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.crowdFunding.findMany({
          where: {
            isApproved: false,
            moderationChecked: false,
          },
        });
      },
    });
  },
});

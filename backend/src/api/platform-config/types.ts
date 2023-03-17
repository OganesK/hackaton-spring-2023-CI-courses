import { objectType } from 'nexus';

export * from './query';

export const PlatformConfig = objectType({
  name: 'PlatformConfig',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.totalProjectCount();
    t.model.totalCompanyCount();
    t.model.totalBudgetInvestment();
    t.model.totalExtraBudgetInvestment();
    t.model.platformTagline();
    t.model.platformTitle();
    t.model.platformDescription();
    t.model.platformShortDescription();
    t.model.newsShownOnLanding();
    t.model.offersShownOnLanding();
    t.model.crowdFundingsShownOnLanding();
    t.model.projectsShownOnLanding();
    t.model.eventsShownOnLanding();
  },
});

// export const PlatformConfigPayload = objectType({
//   name: 'PlatformConfigPayload',
//   definition (t) {
//     t.int('totalInvestments');
//     t.int('totalPartnersCount');
//     t.int('totalProjectsCount');
//     t.string('platformTagline');
//     t.string('platformShortDescription');
//     t.string('platformDescription');
//     t.string('platformTitle');

//     t.list.field('newsShownOnLanding', { type: 'Post' });
//     t.list.field('projectsShownOnLanding', { type: 'Project' });
//   },
// });

import { enumType, objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const RejectMessage = objectType({
  name: 'RejectMessage',
  definition (t) {
    t.string('rejectMessage');
    t.string('entityType');
    t.boolean('verdict');
    t.int('entityId');
  },
});

export const RejectModerationMessage = objectType({
  name: 'RejectModerationMessage',
  definition (t) {
    t.string('rejectMessage');
    t.boolean('verdict');
    t.int('entityId');
  },
});

export const Moderation = objectType({
  name: 'Moderation',
  definition (t) {
    t.model.id();
    t.model.moderatedAt();
    t.model.auditor();
    t.model.auditorId();
    t.model.company();
    t.model.project();
    t.model.contact();
    t.model.post();
    t.model.event();
    t.model.crowdFunding();
  },
});

export const moderateEntityTypes = enumType({
  name: 'moderateEntityTypes',
  members: ['crowdFunding', 'company', 'post', 'event', 'contact', 'project'],
});

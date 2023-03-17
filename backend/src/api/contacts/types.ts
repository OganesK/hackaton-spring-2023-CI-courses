import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const Contact = objectType({
  name: 'Contact',
  definition (t) {
    t.model.id();
    t.model.moderationChecked();
    t.model.emails();
    t.model.adresses();
    t.model.phones();
    t.model.ownerCompany();
    t.model.isApproved();
    t.model.moderate();
  },
});

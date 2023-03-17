import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const Email = objectType({
  name: 'Email',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.email();
  },
});

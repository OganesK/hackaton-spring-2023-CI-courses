import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const Worker = objectType({
  name: 'Worker',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.position();
    t.model.worker();
    t.model.project();
    t.model.publishedPosts({
      ordering: true,
    });
  },
});

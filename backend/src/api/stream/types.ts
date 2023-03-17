import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const Stream = objectType({
  name: 'Stream',
  definition (t) {
    t.model.id();
    t.model.streamKey();
    t.model.event();
    t.model.active();
  },
});

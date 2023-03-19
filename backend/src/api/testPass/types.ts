import { enumType, objectType } from 'nexus';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const TestPass = objectType({
  name: 'TestPass',
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.test();
    t.model.score()
  },
});

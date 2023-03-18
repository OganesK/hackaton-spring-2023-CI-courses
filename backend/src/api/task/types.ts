import { enumType, objectType } from 'nexus';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.model.id();
    t.model.answers();
    t.model.question();
    t.model.cost();
    t.model.rightAnswer();
    t.model.test()
  },
});

import { extendType } from 'nexus';

export const TaskMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.updateOneTask();

    t.crud.createOneTask();
  },
});
import { extendType } from 'nexus';

export const EventQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.event();

    t.crud.events({
      filtering: true,
      ordering: true,
    });

    t.crud.registeredForEvents();
  },
});

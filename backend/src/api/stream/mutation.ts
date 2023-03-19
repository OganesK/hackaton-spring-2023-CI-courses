import { extendType, inputObjectType, nonNull, arg } from 'nexus';
import { GraphQLError } from 'graphql';
import { uuid } from 'uuidv4';

import { Context } from '../../graphql/context';

export const StreamMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneStream();

    t.crud.updateOneStream();
  }
});

export const createStreamArgs = inputObjectType({
  name: 'createStreamArgs',
  definition (t) {
    t.int('eventId');
  },
});

export const updateStreamActivityArgs = inputObjectType({
  name: 'updateStreamActivityArgs',
  definition (t) {
    t.int('streamId');
  },
});

import { extendType, arg, inputObjectType, nonNull } from 'nexus';

import { createRefreshToken } from '../../integrations/jwt';

export const ClientMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signUp', {
      type: 'AuthPayload',
      args: { data: nonNull(arg({ type: SignUpInput })) },
      resolve: async (_, { data }, { dataSources, response }) => {
        const payload = await dataSources.UsersAPI.createUser(data);

        response.cookie('jid', createRefreshToken(payload.user), { httpOnly: true, secure: process.env.ENV_NAME === 'PRODUCTION' });

        return payload;
      },
    });
    t.field('signIn', {
      type: 'AuthPayload',
      args: { data: nonNull(arg({ type: SignInInput })) },
      resolve: async (_, { data }, { dataSources, response }) => {
        const payload = await dataSources.UsersAPI.signIn(data);

        response.cookie('jid', createRefreshToken(payload.user), { httpOnly: true, secure: process.env.ENV_NAME === 'PRODUCTION' });

        return payload;
      },
    });
  },
});

export const SignUpInput = inputObjectType({
  name: 'CreateUserInput',
  definition (t) {
    t.nonNull.string('firstname');
    t.nonNull.string('lastname');
    t.nonNull.string('login');
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition (t) {
    t.nonNull.string('login');
    t.nonNull.string('password');
  },
});

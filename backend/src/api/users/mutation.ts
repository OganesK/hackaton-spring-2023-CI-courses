import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { createRefreshToken } from '../../integrations/jwt';
import { Context } from '../../graphql/context';

export const ClientMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signUp', {
      type: 'AuthPayload',
      args: { data: nonNull(arg({ type: SignUpInput })) },
      resolve: async (_, { data }, { dataSources, response }) => {
        const payload = await dataSources.usersAPI.createUser(data);

        response.cookie('jid', createRefreshToken(payload.user), { httpOnly: true, secure: process.env.ENV_NAME === 'PRODUCTION' });

        return payload;
      },
    });
    t.field('signIn', {
      type: 'AuthPayload',
      args: { data: nonNull(arg({ type: SignInInput })) },
      resolve: async (_, { data }, { dataSources, response }) => {
        const payload = await dataSources.usersAPI.signIn(data);

        response.cookie('jid', createRefreshToken(payload.user), { httpOnly: true, secure: process.env.ENV_NAME === 'PRODUCTION' });

        return payload;
      },
    });
    t.field('updateUserData', {
      type: 'User',
      args: { data: arg({ type: updateUserInput }) },
      resolve: async (_, { data }, ctx: Context) => {
        const currentUserData = await ctx.prisma.user.findUnique({
          where: {
            id: data.userId,
          },
        });

        return ctx.prisma.user.update({
          where: {
            id: data.userId,
          },
          data: {
            email: data.email ? data.email : currentUserData.email,
            login: data.login ? data.email : currentUserData.login,
            firstname: data.firstname ? data.firstname : currentUserData.firstname,
            lastname: data.lastname ? data.lastname : currentUserData.lastname,
            bio: data.bio ? data.bio : currentUserData.bio,
            city: data.city ? data.city : currentUserData.city,
            shortDescription: data.shortDescription ? data.shortDescription : currentUserData.shortDescription,
          },
        });
      },
    });
  },
});

export const SignUpInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('firstname');
    t.nonNull.string('lastname');
    t.nonNull.string('login');
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition(t) {
    t.nonNull.string('login');
    t.nonNull.string('password');
  },
});

export const updateUserInput = inputObjectType({
  name: 'updateUserInput',
  definition(t) {
    t.int('userId');
    t.string('email');
    t.string('login');
    t.string('firstname');
    t.string('lastname');
    t.string('city');
    t.string('shortDescription');
    t.string('bio');
  },
});

export const deleteUserInput = inputObjectType({
  name: 'deleteUserInput',
  definition(t) {
    t.nonNull.int('userId');
  },
});

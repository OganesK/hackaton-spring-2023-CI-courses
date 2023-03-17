import IsEmail from 'isemail';
import { arg, extendType, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../graphql/context';

export const EmailMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('addEmail', {
      type: 'Email',
      args: { data: nonNull(arg({ type: AddEmail })) },
      resolve: async (_, { data }, ctx: Context) => {
        if (!IsEmail.validate(data.email)) {
          throw new Error('Invalid email');
        } else {
          return ctx.prisma.email.create({
            data: {
              email: data.email,
            },
          });
        }
      },
    });
  },
});

export const AddEmail = inputObjectType({
  name: 'addEmail',
  definition (t) {
    t.nonNull.string('email');
  },
});

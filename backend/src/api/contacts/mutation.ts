import { arg, extendType, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../graphql/context';

export const ContactMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOneContact', {
      type: 'Contact',
      args: { data: nonNull(arg({ type: ContactCreateInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.contact.create({
          data: {
            emails: data.emails,
            adresses: data.adresses,
            phones: data.phones,
            ownerCompany: {
              connect: {
                id: data.companyId,
              },
            },
          },
        });
      },
    });

    t.field('updateContact', {
      type: 'String',
      args: { data: nonNull(arg({ type: updateContactInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const contactData = await ctx.prisma.contact.findUnique({
          where: {
            id: data.contactId,
          },
        });

        await ctx.prisma.contact.update({
          where: {
            id: data.contactId,
          },
          data: {
            moderationChecked: false,
            emails: data.emails !== null ? data.emails : contactData.emails,
            adresses: data.adresses !== null ? data.adresses : contactData.adresses,
            phones: data.phones !== null ? data.phones : contactData.phones,
          },
        });

        return 'Succes!';
      },
    });

    t.crud.deleteOneContact();
  },
});

export const updateContactInput = inputObjectType({
  name: 'updateContactInput',
  definition (t) {
    t.nonNull.int('contactId');
    t.list.string('emails');
    t.list.string('adresses');
    t.list.string('phones');
  },
});

export const ContactCreateInput = inputObjectType({
  name: 'ContactCreateInput',
  definition (t) {
    t.nonNull.int('companyId');
    t.list.string('emails');
    t.list.string('adresses');
    t.list.string('phones');
  },
});

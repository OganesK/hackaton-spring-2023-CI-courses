import { rule, shield as Shield, and, or } from 'graphql-shield';

import { Context } from '../context';

const isAuthenticated = rule({ cache: 'contextual' })(
  (parent, args, ctx: Context) => {
    return ctx.user !== null;
  },
);

const permissions = {

};

export const shield = Shield(permissions, { allowExternalErrors: true });

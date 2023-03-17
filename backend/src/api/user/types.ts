import { objectType, enumType } from 'nexus';

export * from './query';
export * from './mutation';

export const Role = enumType({
  name: 'Role',
  members: ['resident', 'moderator', 'administrator'],
});

export const User = objectType({
  name: 'User',
  definition (t) {
    t.nonNull.string('id');
    t.nonNull.field('role', {
      type: 'Role',
    });
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    });
    t.nonNull.string('firstname');
    t.nonNull.string('lastname');
    t.nonNull.string('email');
    t.nonNull.string('login');
    t.nonNull.string('bio');
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition (t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

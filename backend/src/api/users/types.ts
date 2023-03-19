import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.email();
    t.model.login();
    t.model.city();
    t.model.shortDescription();
    t.model.password();
    t.model.firstname();
    t.model.lastname();
    t.model.bio();
    t.model.role();
    t.model.avatar();
    t.model.tokenVersion();
    t.model.groups({
      ordering: true,
    });
    t.model.messages();
    t.model.publishedEvent({
      ordering: true,
    });
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

export const SignUrlUserAvatar = objectType({
  name: 'SignUrlUserAvatar',
  definition(t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

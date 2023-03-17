import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const User = objectType({
  name: 'User',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.email();
    t.model.login();
    t.model.city();
    t.model.shortDescription();
    t.model.password();
    t.model.firstname();
    t.model.lastname();
    t.model.role();
    t.model.bio();
    t.model.avatar();
    t.model.tokenVersion();
    t.model.ownerCompanies();
    t.model.inWorks({
      ordering: true,
    });
    t.model.notifications({
      ordering: true,
    });
    t.model.moderatedEntity();
    t.model.groups({
      ordering: true,
    });
    t.model.messages();
    t.model.publishedEvent({
      ordering: true,
    });
  },
});

export const Notification = objectType({
  name: 'Notification',
  definition (t) {
    t.model.id();
    t.model.theme();
    t.model.body();
    t.model.toWhom();
    t.model.checked();
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition (t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

export const SignUrlUserAvatar = objectType({
  name: 'SignUrlUserAvatar',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
  },
});

import { objectType } from 'nexus';

export * from './query';
export * from './mutation';
export * from './subscription';

export const Message = objectType({
  name: 'Message',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.text();
    t.model.sender();
    t.model.group();
  },
});

export const MessagerGroup = objectType({
  name: 'MessagerGroup',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.admins();
    t.model.avatar();
    t.model.type();
    t.model.title();
    t.model.members();
    t.model.messages();
    t.model.inviteURL();
  },
});

export const StreamMessage = objectType({
  name: 'StreamMessage',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.text();
    t.model.sender();
  },
});

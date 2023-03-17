import { arg, inputObjectType, nonNull, subscriptionField } from 'nexus';
import pubsub from '../../pubsub';

export const subscriptionMessageInGroup = inputObjectType({
  name: 'subscriptionMessageInGroup',
  definition (t) {
    t.nonNull.int('groupId');
  },
});

export const subscriptionMessageInStream = inputObjectType({
  name: 'subscriptionMessageInStream',
  definition (t) {
    t.nonNull.int('streamId');
  },
});

export const subscriptionMessage = subscriptionField('newMessage', {
  type: 'Message',
  args: { data: nonNull(arg({ type: subscriptionMessageInGroup })) },
  subscribe: (_, { data }) => {
    return pubsub.asyncIterator([`MESSAGE_SENDED_${data.groupId}`]);
  },
  resolve: (root: any, args, context, info) => {
    return root?.newMessage;
  },
});

export const subscriptionStreamChat = subscriptionField('streamChat', {
  type: 'StreamMessage',
  args: { data: nonNull(arg({ type: subscriptionMessageInStream })) },
  subscribe: (_, { data }) => {
    return pubsub.asyncIterator([`STREAM_MESSAGE_SENDED_${data.streamId}`]);
  },
  resolve: (root: any, args, context, info) => {
    return root?.newMessage;
  },
});

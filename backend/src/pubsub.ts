import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';
import { SERVER_TYPE } from './config';

const pubsub = SERVER_TYPE === 'prod' ? new RedisPubSub() : new PubSub();

export default pubsub;

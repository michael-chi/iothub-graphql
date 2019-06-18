import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server';
import {Device} from 'azure-iothub';
import {schema_IotHubCommons} from '../schema/iot_common_schema';
let pubsub = new PubSub();

export default {
  resolvers: {
    Query: {
      
    },
    Mutation: {
      
    },
    Subscription: {
        
    }
  },
  typeDefs: [schema_IotHubCommons],
};

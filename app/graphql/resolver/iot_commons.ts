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
    // ,
    // Post: {
    //   user: (post: Partial<GQL.Post>) => getPublicUser(post.userId),
    // },
  },
  typeDefs: [schema_IotHubCommons],
};

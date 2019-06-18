import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server';
import {gql_resolver_query_devices, IoTHubDeviceInputType} from '../../helper/iot_devices_helpers';//'../../helper/iot_devices_helpers';
import {Device} from 'azure-iothub';
import {schema_IotHubDevices} from '../schema/iot_devices_schema';
let pubsub = new PubSub();

export default {
  resolvers: {
    Query: {
      // get devices
      devices: (root: any, {input}: any, {connectionString}: any) => {
        return gql_resolver_query_devices(input, connectionString);
      },
    },
    Mutation: {
      // create a post
      upsertDevice:  async (root: any, { input }: any, context: any) => {
          return null;
      },
    },
    Subscription: {
        deviceUpserted: {
        subscribe: (root:any, args:any, context:any) => {
          return pubsub.asyncIterator('deviceUpserted');
        },
      },
    }
    // ,
    // Post: {
    //   user: (post: Partial<GQL.Post>) => getPublicUser(post.userId),
    // },
  },
  typeDefs: [schema_IotHubDevices],
};

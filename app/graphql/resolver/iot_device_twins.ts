import { PubSub } from 'graphql-subscriptions';
import {gql_resolver_query_devices} from '../../helper/iot_devices_helpers';//'../../helper/iot_devices_helpers';
import {schema_IotHubDeviceTwins} from '../schema/iot_deviceTwins_schema';
import {gql_resolver_query_modules} from '../../helper/iot_modules_helper'

let pubsub = new PubSub();

export default {
  resolvers: {
    IoTHubDeviceTwinType: {
      modules: (parent: any, input: any, {connectionString}: any) => 
        {
          return {};
        }
    },
    Query: {
      devices: (root: any, {input}: any, {connectionString}: any) => {
        return {};
      },
    },
    Mutation: {
      upsertDeviceTwins:  async (root: any, { input }: any, context: any) => {
          return null;
      },
    },
    Subscription: {
        deviceTwinsUpserted: {
        subscribe: (root:any, args:any, context:any) => {
          return pubsub.asyncIterator('deviceTwinsUpserted');
        },
      }
    }
  },
  typeDefs: [schema_IotHubDeviceTwins]
};

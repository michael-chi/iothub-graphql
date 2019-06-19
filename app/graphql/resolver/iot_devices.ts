import { PubSub } from 'graphql-subscriptions';
import {gql_resolver_upsert_device, gql_resolver_query_devices} from '../../helper/iot_devices_helpers';
import {gql_resolver_query_modules} from '../../helper/iot_modules_helper';
import {schema_IotHubDevices} from '../schema/iot_devices_schema';

let pubsub = new PubSub();

export default {
  resolvers: {
    IoTHubDeviceType: {
      modules: (parent: any, input: any, {connectionString}: any) => 
        {
          return gql_resolver_query_modules({deviceId:parent.deviceId, moduleId:''}, connectionString);
        }
    },
    Query: {
      devices: (root: any, {input}: any, {connectionString}: any) => {
        return gql_resolver_query_devices(input, connectionString);
      },
    },
    Mutation: {
      upsertDevice:  async (root: any, { input }: any, {connectionString}: any) => {
        return gql_resolver_upsert_device(input, connectionString);

      },
    },
    Subscription: {
        deviceUpserted: {
        subscribe: (root:any, args:any, context:any) => {
          return pubsub.asyncIterator('deviceUpserted');
        },
      }
    }
  },
  typeDefs: [schema_IotHubDevices]
};

import { PubSub } from 'graphql-subscriptions';
import {gql_resolver_upsert_device, gql_resolver_query_devices, gql_resolver_delete_device} from '../../helper/iot_devices_helpers';
import {gql_resolver_query_modules} from '../../helper/iot_modules_helper';
import {schema_IotHubDevices} from '../schema/iot_devices_schema';
import { IoTHubDeviceInputType } from '../types/IoTHubDeviceInputType';

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
      devices: (root: any, {input}: any, context: any) => {
        return gql_resolver_query_devices(input, context);
      },
    },
    Mutation: {
      upsertDevice:  async (root: any, { input }: any, context: any) => {
        return await gql_resolver_upsert_device(input, context);

      },
      deleteDevice: async (root:any, {input}:any, context:any) => {
        console.log(`[iot_devices::delete]deleting device...`);
        return await gql_resolver_delete_device(input, context);
      }
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

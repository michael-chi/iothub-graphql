import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server';
import {gql_resolver_query_devices, IoTHubDeviceInputType} from '../../helper/iot_devices_helpers';//'../../helper/iot_devices_helpers';
import {Device} from 'azure-iothub';
import {schema_IotHubDevices} from '../schema/iot_devices_schema';
import {gql_resolver_query_modules, IoTHubModuleInputType} from '../../helper/iot_modules_helper'

let pubsub = new PubSub();

export default {
  resolvers: {
    IoTHubDeviceType: {
      modules: (parent: any, {input}: any, {connectionString}: any) => 
        {
          console.log(JSON.stringify(input));
          return gql_resolver_query_modules(input, connectionString);
        }
    },
    Query: {
      devices: (root: any, {input}: any, {connectionString}: any) => {
        return gql_resolver_query_devices(input, connectionString);
      },
    },
    Mutation: {
      upsertDevice:  async (root: any, { input }: any, context: any) => {
          return null;
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

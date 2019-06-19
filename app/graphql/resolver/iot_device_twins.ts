import { PubSub } from 'graphql-subscriptions';
import {schema_IotHubDeviceTwins} from '../schema/iot_deviceTwins_schema';
import {gql_resolver_query_deviceTwins} from '../../helper/iot_deviceTwins_helpers';
let pubsub = new PubSub();

export default {
  resolvers: {
    IoTHubDeviceType: {
      deviceTwins: (parent: any, {input}: any, {connectionString}: any) => 
        {
          if(parent){
            console.log(`[IoTHubDeviceType.deviceTwins::resolver]${JSON.stringify(parent)}`);
            return gql_resolver_query_deviceTwins({deviceId:parent.deviceId},connectionString);
          }else{
            console.log(`[IoTHubDeviceType.deviceTwins::resolver]${JSON.stringify(input)}`);
            return gql_resolver_query_deviceTwins(input,connectionString);
          }
        }
    },
    Query: {
      deviceTwins: (parent: any, {input}: any, {connectionString}: any) => {
        if(parent){
          console.log(`[deviceTwins::resolver]${JSON.stringify(parent)}`);
          return gql_resolver_query_deviceTwins({deviceId:parent.deviceId},connectionString);
        }else{
          console.log(`[deviceTwins::resolver]${JSON.stringify(input)}`);
          return gql_resolver_query_deviceTwins(input,connectionString);
        }
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

import { PubSub } from 'graphql-subscriptions';
import {schema_IotHubDeviceTwins} from '../schema/iot_deviceTwins_schema';
import {gql_resolver_query_deviceTwin} from '../../helper/iot_deviceTwins_helpers';
let pubsub = new PubSub();

export default {
  resolvers: {
    IoTHubDeviceType: {
      deviceTwins: (parent: any, {input}: any, context: any) => 
        {
          if(parent){
            console.log(`[IoTHubDeviceType.deviceTwins::resolver]${JSON.stringify(parent)}`);
            return gql_resolver_query_deviceTwin({deviceId:parent.deviceId}, context);
          }else{
            console.log(`[IoTHubDeviceType.deviceTwins::resolver]${JSON.stringify(input)}`);
            return gql_resolver_query_deviceTwin(input, context);
          }
        }
    },
    Query: {
      deviceTwins: (parent: any, {input}: any, context: any) => {
        if(parent){
          //console.log(`[deviceTwins::resolver]${JSON.stringify(parent)}`);
          return gql_resolver_query_deviceTwin({deviceId:parent.deviceId},context);
        }else{
          //console.log(`[deviceTwins::resolver]${JSON.stringify(input)}`);
          return gql_resolver_query_deviceTwin(input,context);
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

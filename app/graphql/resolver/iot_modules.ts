import { PubSub } from 'graphql-subscriptions';
import {gql_resolver_query_modules} from '../../helper/iot_modules_helper';//'../../helper/iot_modules_helper';
import {schema_IotHubModules} from '../schema/iot_modules_schema';
let pubsub = new PubSub();

export default {
  resolvers: {
    IoTHubModuleType:{

    },
    Query: {
      // get modules
      modules: (root: any, {input}: any, {connectionString}: any) => {
        return gql_resolver_query_modules(input, connectionString);
      },
    },
    Mutation: {
      
    },
    Subscription: {
        moduleUpserted: {
        subscribe: (root:any, args:any, context:any) => {
          return pubsub.asyncIterator('moduleUpserted');
        },
      },
    },
  },
  typeDefs: [schema_IotHubModules],
};

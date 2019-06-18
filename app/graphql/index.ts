import { mergeWith, isArray, merge } from 'lodash';
import { gql, IExecutableSchemaDefinition } from 'apollo-server';
import devices from './resolver/iot_devices';
import modules from './resolver/iot_modules';
import commons from './resolver/iot_commons';

// create our schema
function withArraysConcatination(objValue:any, srcValue:any) {
  // if an array, concat it
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  // use the normal lodash merge functionality
}
// allows us to merge schemas
export const mergeRawSchemas = (...schemas: IExecutableSchemaDefinition[]):
    IExecutableSchemaDefinition => {
  return mergeWith({}, ...schemas, withArraysConcatination);
};

let rawSchemas =  mergeRawSchemas(
    {
      typeDefs: [
        // we create empty main types, we can later extend them in the shards
        gql`
                   type Query {
                      _empty: String
                  }
                  type Mutation {
                      _empty: String
                  }
                  type Subscription {
                      _empty: String
                  }
              `,
      ],
      resolvers: {},
    },
    commons,
    devices,
    modules
  );

// let rawSchemas = mergeRawSchemas(
//     devices
// );
export let schema = rawSchemas.typeDefs;
export let resolvers = rawSchemas.resolvers;
export let graphqlSchemas = rawSchemas;
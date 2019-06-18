import { mergeWith, isArray, merge } from 'lodash';
import { gql, IExecutableSchemaDefinition } from 'apollo-server';
import devices from './iot_devices';

const port = process.env.PORT || 3000;

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
    devices,
  );

// let rawSchemas = mergeRawSchemas(
//     devices
// );
export let schema = rawSchemas.typeDefs;
export let resolvers = rawSchemas.resolvers;
export let graphqlSchemas = rawSchemas;
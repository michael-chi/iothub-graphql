const { GraphQLScalarType, GraphQLObjectType } = require('graphql');
const { Kind } = require('graphql/language');
import {schema_GraphQLScalarTypes} from '../schema/graphql_scalar_schema';
import {gql_resolver_query_deviceTwin} from '../../helper/iot_deviceTwins_helpers';

export default {
    resolvers: {
      IoTDeviceTwinPropertyType: new GraphQLScalarType({
            name: 'twinProperties',
            description: '',
            serialize(value:any) {
              // value sent to the client
              console.log(`==============\r\nserialize\r\n==============`);
              console.log(JSON.stringify(value));
              return value;
            },
            parseValue(value:any) {
              // value from the client (variables)
              console.log(`==============\r\nparseValue\r\n==============`);
              console.log(JSON.stringify(value));
              return value;
            },
            parseLiteral(ast:any) {
              // value from the client (inline arguments)
              //switch(ast.kind) {}
              console.log(`==============\r\nparseLiteral\r\n==============`);
              console.log(JSON.stringify(ast.value));
              return ast.value;
            }
        })
    },
    typeDefs: [schema_GraphQLScalarTypes],
};

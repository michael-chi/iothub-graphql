import { gql } from 'apollo-server';
// TODO:
//  I need to two types one for Input, another for Query output. Is there a better way ?
export let schema_GraphQLScalarTypes = gql`
scalar IoTDeviceTwinPropertyType

extend type Query{
    twinProperties(input:String!): IoTDeviceTwinPropertyType
  }
`;

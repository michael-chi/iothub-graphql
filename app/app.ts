const { ApolloServer, gql } = require('apollo-server');
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlSchemas, schema, resolvers } from './graphql';
import { Config } from 'apollo-server';

let schemas = makeExecutableSchema(graphqlSchemas);

const port = process.env.PORT || 4000;
const apolloConfig: Config = {
  schema: schemas,
  context: async ({ req }) => {
    //  Get Authorization Header from http request header
    const token = req.headers['authorization'];
    const connectionString = req.headers['x-connectionstring'];
    return {token, connectionString};
  }
};

const server = new ApolloServer(apolloConfig);

server.listen(port).then((u:any) => {
  console.log(`🚀  Server ready at ${u.url}`);
});
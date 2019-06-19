IoT Hub | GraphQL
=================

# Execute Locally

## Installation
-   Install npm packages
```
npm install
```
##  Compile
-   Compile Typescript codes
```
tsc -p .
```
Or 
```
npm run build
```
##  Run
-   Launch Apollo Server
```
npm run start
```
## Test
-   Launch Postman
-   Start a POST to http://localhost:4000
-   Add below Headers
    -   x-ConnectionString: IoT Hub Connection String retrieved from your IoT Hub
    -   Content-Type: application/json
-   Request Body samples
    -  Query Devices with Module and DeviceTwins
```json
{
	"operationName":"iothub",
	"variables":
		{"input":
			{"deviceId":"device001"}
		},
		"query":
			"query iothub($input: IoTHubModuleInputType!) {\n  modules(input: $input) {\n    deviceId\n    moduleId\n    etag\n    cloudToDeviceMessageCount\n    \n  }\n}\n"
	}
```

#   Develop new schema and resolvers
##  Add a new GraphQL schema
-   Create a new file under app/graphql/schema with below content. All GraphQL required types must be defined in this file.
  
    File name should be in <mark>iot_\<featureName\>_schema.ts</mark> format
```typescript
import { gql } from 'apollo-server';

export let schema_IotHubModules = gql`
input IoTHubModuleInputType {
  deviceId: String
  moduleId: String
}

extend type Query{
  " get all modules on a device "
  modules(input:IoTHubModuleInputType!): [IoTHubModuleType]
}

extend type Mutation {
  " add or update an IoT Device "
  upsertModule(input: IoTHubModuleInputType!): IoTHubModuleType
}

extend type Subscription {
  " called when a new post is created "
  moduleUpsert: IoTHubModuleType
}

type IoTHubModuleType {
  authentication: IoTHubAuthenticationType
  cloudToDeviceMessageCount: String
  connectionState: String
  connectionStateUpdatedTime: String
  deviceId: String
  etag: String
  generationId: String
  lastActivityTime: String
  managedBy: String
  moduleId: String
}
`;

```
## Add Resolver
-   Create a resolver under app/graphql/resolver with file name in <mark>iot_\<featureName\>.ts</mark> format

-   Add below content
    
    This is resolves GraphQL runtime will be looking for when resolving queries. You must define all query, mutation, graphql types, subscriptions here in order to allow client application query them.

```typescript
import { PubSub } from 'graphql-subscriptions';
import {gql_resolver_query_modules} from '../../helper/iot_modules_helper';
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
      upsertDevice:  async (root: any, { input }: any, context: any) => {
          return null;
      },
    },
    Subscription: {
        deviceUpserted: {
        subscribe: (root:any, args:any, context:any) => {
          return pubsub.asyncIterator('deviceUpserted');
        },
      },
    },
  },
  typeDefs: [schema_IotHubModules],
};

```

##  Add Input Type defination

-   If you query requires GraphQL input type, add a type defination under app/types folder

```typescript
export class IoTHubDeviceInputType {
    public deviceId: string = '';
  }
```
##  Add Helper functions

-   If your resolver need to invoke external APIs, create a helper under app/helper folder with file name in <mark>iot_\<feature name\>_helper.ts</mark>

-   This helper should wrap any external calls, type convertions as export functions, objects or classes.

```typescript
let iothub = require('azure-iothub');
import { Module} from 'azure-iothub';
import {IoTHubModuleInputType} from '../graphql/types/IoTHubModuleInputType';

let createGqlType = (modules:Module[]):Module[] => {
  return modules.map((x: Module) => ({ 
    authentication: x.authentication,
    cloudToDeviceMessageCount: x.cloudToDeviceMessageCount,
    connectionState: x.connectionState,
    connectionStateUpdatedTime: x.connectionStateUpdatedTime,
    deviceId: x.deviceId,
    etag: x.etag,
    generationId: x.generationId,
    lastActivityTime: x.lastActivityTime,
    managedBy: x.managedBy,
    moduleId: x.moduleId    
  }));  
}

let query_modules = async (connectString: string, input:IoTHubModuleInputType): Promise<Module[]> => {
  let registry = iothub.Registry.fromConnectionString(connectString);
  let result = null;
  
  if(input.deviceId && input.deviceId){
    if(input.moduleId && input.moduleId){
      result = await registry.getModule(input.deviceId, input.moduleId);
    }else{
      result = await registry.getModulesOnDevice(input.deviceId);
    }
  }
  if(result){
    let modules = result.responseBody;
    return createGqlType(modules);
  }else{
    return [];
  }

}

export async function gql_resolver_query_modules (input:IoTHubModuleInputType, connectString:string) :Promise<Module[]> {
  console.log(`retrieving modules ${input.deviceId} | ${input.moduleId}`);
  return await query_modules(connectString, input);
}
```

##  Update index.ts

-   Once finished, update app/graphql/index.ts to include your new resolvers, schemas

```typescript
import { mergeWith, isArray, merge } from 'lodash';
import { gql, IExecutableSchemaDefinition } from 'apollo-server';
import devices from './resolver/iot_devices';
//  ...other imports...
//  Add your new resolver import here
//      * no need to import schema as it is imported in resolver.ts
```

-   Merge imported schema with existing schemas

```typescript
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
    modules,
    devices,
    deviceTwins
    //  Add your new imported schema here
    //  ex:
    //      , identities
  );
``` 

# Notes
- Azure IoT SDK only allows updating device capabilities

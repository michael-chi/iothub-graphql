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
  moduleUpserted: IoTHubModuleType
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
  moduleTwins:IoTHubDeviceTwinType
}
`;

import { gql } from 'apollo-server';

export let schema_IotHubModules = gql`
" input to create a new post "
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
  deviceId: String
  generationId: String
  etag: String
  connectionState: String
  status: String
  statusReason: String
  connectionStateUpdatedTime: String
  statusUpdatedTime: String
  lastActivityTime: String
  cloudToDeviceMessageCount: Int
  capabilities: IoTHubDeviceCapabilitityType
  authentication: IoTHubAuthenticationType
}
`;

import { gql } from 'apollo-server';

export let schema_IotHubDevices = gql`
  input IoTHubDeviceInputType {
    deviceId: String
  }

  extend type Query{
    " get all devices "
    devices(input:IoTHubDeviceInputType!): [IoTHubDeviceType]
  }

  extend type Mutation {
    " add or update an IoT Device "
    upsertDevice(input: IoTHubDeviceInputType!): IoTHubDeviceType
  }

  extend type Subscription {
    " called when a new post is created "
    deviceUpserted: IoTHubDeviceType
  }

  type IoTHubDeviceCapabilitityType{
    iotEdge: Boolean
  }
  type IoTHubDeviceType {
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
    modules: [IoTHubModuleType]
    deviceTwins: IoTHubDeviceTwinType
  }
`;
import { gql } from 'apollo-server';

export let schema_IotHubDeviceTwins = gql`
  extend type Query{
    " get all devices "
    twins(input:IoTHubDeviceInputType!): [IoTHubDeviceTwinType]
  }

  extend type Mutation {
    " add or update an IoT Device "
    upsertTwins(input: IoTHubDeviceInputType!): IoTHubDeviceTwinType
  }

  extend type Subscription {
    " called when a new post is created "
    twinsUpsert: IoTHubDeviceTwinType
  }

  type IoTHubDeviceTwinType {
    deviceId: String
    etag: String
    moduleId: String
    tags: String
    properties: String
  }
`;
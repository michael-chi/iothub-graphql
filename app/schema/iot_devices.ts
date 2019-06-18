import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server';
import {listDevices} from '../api/deviceClient';
import {Device} from 'azure-iothub';

let pubsub = new PubSub();

const typeDefs = gql`
  extend type Query {
    " get all devices "
    devices: [IoTHubDeviceType]
  }

  extend type Mutation {
    " add or update an IoT Device "
    upsertDevice(input: IoTHubDeviceInputType!): IoTHubDeviceType
  }

  extend type Subscription {
    " called when a new post is created "
    deviceUpserted: IoTHubDeviceType
  }

  " input to create a new post "
  input IoTHubDeviceInputType {
    text: String
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
    authentication: IoTHubDeviceAuthenticationType
  }
  type IoTHubDeviceKeyPairType{
    primaryKey: String
    secondaryKey: String
  }
  type IoTHubDeviceAuthenticationType
  { 
    symmetricKey: IoTHubDeviceKeyPairType
    x509Thumbprint: IoTHubDeviceThumbprintType
    type: String
  }
  type IoTHubDeviceThumbprintType {
    primaryThumbprint: String
    secondaryThumbprint: String
  }
`;

async function get_devices (connectString:string) :Promise<Device[]> {
  let results = await listDevices(connectString);
  let devices = results.responseBody;
  return devices.map(x => ({ 
    deviceId: x.deviceId,
    generationId: x.generationId,
    etag: x.etag,
    connectionState: x.connectionState,
    status: x.status,
    statusReason: x.statusReason,
    connectionStateUpdatedTime: x.connectionStateUpdatedTime,
    statusUpdatedTime: x.statusUpdatedTime,
    lastActivityTime: x.lastActivityTime,
    cloudToDeviceMessageCount: x.cloudToDeviceMessageCount,
    capabilities: x.capabilities,
    authentication: x.authentication
  }));
}

export default {
  resolvers: {
    Query: {
      // get devices
      devices: (root: any, { input }: any, {connectionString}: any) => {
        return get_devices(connectionString);
      },
    },
    Mutation: {
      // create a post
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
    }
    // ,
    // Post: {
    //   user: (post: Partial<GQL.Post>) => getPublicUser(post.userId),
    // },
  },
  typeDefs: [typeDefs],
};

let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';

export class IoTHubDeviceInputType {
  public deviceId: string = '';
}

let createGqlType = (devices:Device[]):Device[] => {
  return devices.map((x: Device) => ({ 
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

let query_devices = async (connectString:string) : Promise<Device[]> => {
  let registry = iothub.Registry.fromConnectionString(connectString);
  let results = await registry.list();
  let devices = results.responseBody;
  return createGqlType(devices);
}

let query_device = async (connectString: string, input:IoTHubDeviceInputType): Promise<Device[]> => {
  let registry = iothub.Registry.fromConnectionString(connectString);
  let result = await registry.get(input.deviceId);
  let device = result.responseBody;
  return createGqlType([device]);

}

export async function gql_resolver_query_devices (input:IoTHubDeviceInputType, connectString:string) :Promise<Device[]> {
  if(input.deviceId)
    return await query_device(connectString, input);
  else
    return await query_devices(connectString);
}

let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {ResultWithHttpResponse} from 'azure-iot-common';

let listDevices = async (connectionString:string):Promise<ResultWithHttpResponse<Device[]>> => {
    let registry = iothub.Registry.fromConnectionString(connectionString);
    let devices = await registry.list();
    return devices;
}

export async function list_devices (connectString:string) :Promise<Device[]> {
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
 
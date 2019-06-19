let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {IoTHubDeviceInputType} from '../graphql/types/IoTHubDeviceInputType';
import {IoTHubDeviceCapabilitityInputType} from '../graphql/types/IoTHubDeviceCapabilitityInputType';

let createGqlTypes = (devices:Device[]):Device[] => {
  if(devices)
    return devices.map((x: Device) => createGqlType(x));
  else
    return [];
}
let createGqlType = (x:Device):Device => {
  if(x)
    return { 
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
    };
  else
    return {deviceId:''};
}
let query_devices = async (connectString:string) : Promise<Device[]> => {
  let registry = iothub.Registry.fromConnectionString(connectString);
  let results = await registry.list();
  let devices = results.responseBody;
  return createGqlTypes(devices);
}

let query_device = async (connectString: string, input:IoTHubDeviceInputType): Promise<Device[]> => {
  let registry = iothub.Registry.fromConnectionString(connectString);
  let result = await registry.get(input.deviceId);
  let device = result.responseBody;
  return createGqlTypes([device]);

}

export async function gql_resolver_query_devices (input:IoTHubDeviceInputType, connectString:string) :Promise<Device[]> {
  if(input.deviceId)
    return await query_device(connectString, input);
  else
    return await query_devices(connectString);
}

export async function gql_resolver_upsert_device (input:IoTHubDeviceInputType, connectString:string) :Promise<Device> {
  let device = null;
  let result = null;
  let registry = iothub.Registry.fromConnectionString(connectString);
  console.log(`[gql_resolver_upsert_device]input=${JSON.stringify(input)}`);

  if(input.deviceId){
    try{
      result = await registry.get(input.deviceId);
      console.log(`[gql_resolver_upsert_device]got!`);
      let resp = result.responseBody;
      device = createGqlType(resp);
      console.log(`[gql_resolver_upsert_device]device=${JSON.stringify(device)}`);
    }catch(ex){
      console.log(`[gql_resolver_upsert_device]unable to get device by Id, error:${ex}`);
    }
  }
  if(!device){
    device = await registry.create(input)
    let x = createGqlType(device.responseBody);
    console.log(`[gql_resolver_upsert_device]created ${x.deviceId}`);
    
    return x;
  }else{
    //  update
    device = await registry.update(input);
    let x = createGqlType(device.responseBody);
    console.log(`[gql_resolver_upsert_device]updated ${x.deviceId}`);
    
    return x;
  }
}

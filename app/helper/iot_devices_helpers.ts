let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {IoTHubDeviceInputType} from '../graphql/types/IoTHubDeviceInputType';
import {IoTHubDeviceCapabilitityInputType} from '../graphql/types/IoTHubDeviceCapabilitityInputType';
const DataLoader = require('dataloader');
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
let query_devices = async (context:any, deviceIds:string[]) => {
  let {connectionString, dataloaders} = context;
  dataloaders['query_devices'] = new DataLoader(async (deviceIds:string[]) =>{
    let registry = iothub.Registry.fromConnectionString(connectionString);
    let devices = await deviceIds.map(async (deviceId) => {
      console.log(`procesisng ${deviceId} | ${connectionString}`);
      let device = await registry.get(deviceId);
      return createGqlType(device.responseBody);
    });
    return devices;
  });
  return await dataloaders['query_devices'].loadMany(deviceIds);
}


export async function gql_resolver_query_devices (input:IoTHubDeviceInputType[], context:any) :Promise<Device[]> {
  //let {deviceIds} = input;
  console.log(`[gql_resolver_query_devices][input]${JSON.stringify(input)}`);
  return await query_devices(context, await input.map(d => d.deviceId));
}

export async function gql_resolver_delete_device(input:string, connectString: string): Promise<Boolean> {
  console.log(`[gql_resolver_delete_device]deleting device ${input}...`);  
  try{
    let registry = iothub.Registry.fromConnectionString(connectString);
    let result = await registry.delete(input);
    console.log(`[gql_resolver_delete_device]deleting device...`);  
    return true;
  }catch(ex){
    console.log(`[Exception][gql_resolver_delete_device]error while deleting device:${ex}`);
    throw ex;
  }
}

export async function gql_resolver_upsert_device (input:IoTHubDeviceInputType[], context:any) :Promise<Device[]> {
  let device = null;
  let {connectionString, dataloaders} = context;

  let registry = iothub.Registry.fromConnectionString(connectionString);

  dataloaders['upsert_devices'] = new DataLoader(async (deviceIds:string[]) =>{
    let registry = iothub.Registry.fromConnectionString(connectionString);
    let devices = await deviceIds.map(async (deviceId) => {
      console.log(`procesisng ${deviceId} | ${connectionString}`);
      let device = await registry.get(deviceId);
      if(device){
        return createGqlType(device.responseBody);
      }else{
        return {deviceId:deviceId, isNew:true};
      }
    });
    return devices;
  });
  let result:Device[] = [];
  input.forEach(async element => {
    let device = await dataloaders['upsert_devices'].load(element.deviceId);
    if(device)
    {
        if(device.isNew){
          console.log(`[gql_resolver_upsert_device]creating new device ${device.deviceId}`);
          let newDevice = await registry.create(input)
          let x = createGqlType(newDevice.responseBody);
          result.push(x);
        }else{
          console.log(`[gql_resolver_upsert_device]updating new device ${device.deviceId}`);
          let updatedDevice = await registry.update(input);
          let x = createGqlType(updatedDevice.responseBody);
          result.push(x);
        }
    }
  });
  return result;
}

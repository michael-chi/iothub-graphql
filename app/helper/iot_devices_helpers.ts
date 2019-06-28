let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {IoTHubDeviceInputType} from '../graphql/types/IoTHubDeviceInputType';
import {IoTHubDeviceCapabilitityInputType} from '../graphql/types/IoTHubDeviceCapabilitityInputType';
import {asyncForEach} from '../helper/array_util';
import { update_twins } from './iot_deviceTwins_helpers';
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

export async function gql_resolver_delete_device(input:string[], context: any): Promise<Boolean> {
  console.log(`[gql_resolver_delete_device]deleting device ${input}...`);  
  try{
    let {connectionString} = context;
    let registry = iothub.Registry.fromConnectionString(connectionString);
    
    //for(var element in input) 
    await asyncForEach(input, async (element:any) =>
    {
      let result = await registry.delete(element);
      console.log(`[gql_resolver_delete_device]deleting device...${result}`);  
    });
    
    return true;
  }catch(ex){
    console.log(`[Exception][gql_resolver_delete_device]error while deleting device:${ex}`);
    throw ex;
  }
}
async function upsert_devices (input:IoTHubDeviceInputType[], context:any) :Promise<Device[]> {
  let device = null;
  let {connectionString, dataloaders} = context;

  let registry = iothub.Registry.fromConnectionString(connectionString);

  dataloaders['upsert_devices'] = new DataLoader(async (deviceIds:string[]) =>{
    let registry = iothub.Registry.fromConnectionString(connectionString);
    let devices = await deviceIds.map(async (deviceId) => {
      console.log(`procesisng ${deviceId} | ${connectionString}`);
      try{
        let device = await registry.get(deviceId);
        if(device){
          return createGqlType(device.responseBody);
        }else{
          return {deviceId:deviceId, isNew:true};
        }
      }catch(ex){
        return {deviceId:deviceId, isNew:true};
      }
    });
    return devices;
  });
  let result:Device[] = [];
  //Array.ForEach is non-blocking:https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
  await asyncForEach(input, async (element:IoTHubDeviceInputType) =>
  {
    let device = await dataloaders['upsert_devices'].load(element.deviceId);
    let x = null;
    if(device)
    {
        if(device.isNew){
          console.log(`[gql_resolver_upsert_device]creating new device ${device.deviceId}`);
          let newDevice = await registry.create(element);
          x = createGqlType(newDevice.responseBody);
        }else{
          console.log(`[gql_resolver_upsert_device]updating device ${device.deviceId}`);
          let updatedDevice = await registry.update(element);
          console.log(`[gql_resolver_upsert_device]updated=${JSON.stringify(updatedDevice.responseBody)}`);
          x = createGqlType(updatedDevice.responseBody);
        }
    }else{
      console.log(`[gql_resolver_upsert_device]creating new device ${device.deviceId}`);
      let newDevice = await registry.create(element)
      x = createGqlType(newDevice.responseBody);
    }
    if(x){
      let {twinProperties} = element;
      if(twinProperties){
        let updatedTwin = update_twins(element, context);
      }
      result.push(x);
    }
  });
  console.log('========================');
  console.log(`[gql_resolver_upsert_device]result=${JSON.stringify(result)}`);
  return result;
}
export async function gql_resolver_upsert_device (input:IoTHubDeviceInputType[], context:any) :Promise<Device[]> {
  return await upsert_devices (input, context);
}

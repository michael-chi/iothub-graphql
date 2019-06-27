let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {IoTHubDeviceInputType} from '../graphql/types/IoTHubDeviceInputType';
const DataLoader = require('dataloader');

let createGqlType = (x:any):any => {
  return {
    deviceId: x.deviceId,
    etag: x.etag,
    moduleId: x.moduleId,
    tags : x.tags ? JSON.stringify(x.tags) : '',
    properties: x.properties ? JSON.stringify(x.properties) : ''
  };
}

let query_deviceTwins = async (input:IoTHubDeviceInputType[], context:any) => {
  if(!input){
    throw '[Exception]no deviceId specified';
  }
  
  let {dataloaders, connectionString} = context;
  let registry = iothub.Registry.fromConnectionString(connectionString);

  console.debug(`[query_deviceTwins]${JSON.stringify(input)}`);

  dataloaders['query_deviceTwins'] = new DataLoader(async (deviceIds:string[]) =>{
    let registry = iothub.Registry.fromConnectionString(connectionString);
    let twins = await deviceIds.map(async (deviceId) => {
      console.log(`procesisng ${deviceId} | ${connectionString}`);
      let twins = await registry.getTwin(deviceId);
      return createGqlType(twins.responseBody);
    });
    return twins;
  });
  return await dataloaders['query_deviceTwins'].loadMany(await input.map(a => a.deviceId));
}

export async function gql_resolver_query_deviceTwins (input:IoTHubDeviceInputType[], context:any) {
  return await query_deviceTwins(input, context);
}

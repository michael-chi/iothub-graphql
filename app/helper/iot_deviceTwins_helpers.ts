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
    properties: x.properties ? JSON.stringify(x.properties) : '',
    twinProperties: x.properties
  };
}

let query_deviceTwin = async (input:IoTHubDeviceInputType, context:any) => {
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
      console.log(`[query_deviceTwins]twins=${JSON.stringify(twins.responseBody)}`);
      let result = createGqlType(twins.responseBody);
      console.log('===============');
      console.log(`[query_deviceTwins]result=${JSON.stringify(result)}`);
      return result;
    });
    return twins;
  });
  let loaded = await dataloaders['query_deviceTwins'].load([input.deviceId]);
  console.log(`================\r\n${JSON.stringify(loaded)}`);
  return loaded;
}

export async function gql_resolver_query_deviceTwin (input:IoTHubDeviceInputType, context:any) {
  return await query_deviceTwin(input, context);
}

let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {IoTHubDeviceInputType} from '../graphql/types/IoTHubDeviceInputType';


let createGqlType = (x:any):any => {
  return {
    deviceId: x.deviceId,
    etag: x.etag,
    moduleId: x.moduleId,
    tags : x.tags ? JSON.stringify(x.tags) : '',
    properties: x.properties ? JSON.stringify(x.properties) : ''
  };
}

let query_deviceTwins = async (connectString: string, input:IoTHubDeviceInputType): Promise<Device[]> => {
  let registry = iothub.Registry.fromConnectionString(connectString);
  if(!input.deviceId){
    throw '[Exception]no deviceId specified';
  }
  console.debug(`[query_deviceTwins]${JSON.stringify(input)}`);
  let result = await registry.getTwin(input.deviceId);
  let twins = result.responseBody;
  return createGqlType(twins);
}

export async function gql_resolver_query_deviceTwins (input:IoTHubDeviceInputType, connectString:string) :Promise<Device[]> {
  return await query_deviceTwins(connectString, input);
}

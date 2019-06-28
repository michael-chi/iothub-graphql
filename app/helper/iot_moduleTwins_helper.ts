let iothub = require('azure-iothub');
import { Module, Twin} from 'azure-iothub';
import {IoTHubModuleInputType} from '../graphql/types/IoTHubModuleInputType';
import {asyncForEach} from '../helper/array_util';

let createGqlType = (x:Twin):Twin => {
  return x;
  // return { 
  //   authentication: x.authentication,
  //   cloudToDeviceMessageCount: x.cloudToDeviceMessageCount,
  //   connectionState: x.connectionState,
  //   connectionStateUpdatedTime: x.connectionStateUpdatedTime,
  //   deviceId: x.deviceId,
  //   etag: x.etag,
  //   generationId: x.generationId,
  //   lastActivityTime: x.lastActivityTime,
  //   managedBy: x.managedBy,
  //   moduleId: x.moduleId    
  // };  
}

let query_moduleTwins = async (input:IoTHubModuleInputType, context:any): Promise<Twin | null> => {
  let {connectionString, dataloaders} = context;
  let registry = iothub.Registry.fromConnectionString(connectionString);
  let result = null;
  
  if(input.deviceId){
    if(input.moduleId){
      let moduleTwin = await registry.getModuleTwin(input.deviceId, input.moduleId);
      result = moduleTwin.responseBody;
    }else{
      let moduleOnDevices = await registry.getModulesOnDevice(input.deviceId);
      await asyncForEach(
        moduleOnDevices.responseBody,
        async (element:Module) => {
          let twin = await registry.getModuleTwin(input.deviceId, element.moduleId);
          result = twin.responseBody;
        }
      );
    }
  }
  if(result){
    let twinObject = createGqlType(result);
    console.log(`[query_moduleTwins]twinObject=${JSON.stringify(twinObject)}`)
    return twinObject;
  }else{
    return null;
  }
}
export async function gql_resolver_query_moduleTwins (input:IoTHubModuleInputType, context:any) :Promise<Twin | null> {
  console.log(`retrieving module Twins ${input.deviceId} | ${input.moduleId}`);
  return await query_moduleTwins(input, context);
}


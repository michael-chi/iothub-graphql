let iothub = require('azure-iothub');
import {Device, Module} from 'azure-iothub';
import {ResultWithHttpResponse, RetryOperation} from 'azure-iot-common';

export class IoTHubModuleInputType {
  public deviceId: string = '';
  public moduleId: string = '';
}
let createGqlType = (modules:Module[]):Module[] => {
  return modules.map((x: Module) => ({ 
    authentication: x.authentication,
    cloudToDeviceMessageCount: x.cloudToDeviceMessageCount,
    connectionState: x.connectionState,
    connectionStateUpdatedTime: x.connectionStateUpdatedTime,
    deviceId: x.deviceId,
    etag: x.etag,
    generationId: x.generationId,
    lastActivityTime: x.lastActivityTime,
    managedBy: x.managedBy,
    moduleId: x.moduleId    
  }));  
}

let query_modules = async (connectString: string, input:IoTHubModuleInputType): Promise<Module[]> => {
  let registry = iothub.Registry.fromConnectionString(connectString);
  let result = null;
  
  if(input.deviceId && input.deviceId){
    if(input.moduleId && input.moduleId){
      result = await registry.getModule(input.deviceId, input.moduleId);
    }else{
      result = await registry.getModulesOnDevice(input.deviceId);
    }
  }
  if(result){
    let modules = result.responseBody;
    return createGqlType(modules);
  }else{
    return [];
  }

}

export async function gql_resolver_query_modules (input:IoTHubModuleInputType, connectString:string) :Promise<Module[]> {
  console.log(`retrieving modules ${input.deviceId} | ${input.moduleId}`);
  return await query_modules(connectString, input);
}

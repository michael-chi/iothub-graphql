let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {ResultWithHttpResponse} from 'azure-iot-common';

export let listDevices = async (connectionString:string):Promise<ResultWithHttpResponse<Device[]>> => {
    let registry = iothub.Registry.fromConnectionString(connectionString);
    let devices = await registry.list();
    return devices;
}

 
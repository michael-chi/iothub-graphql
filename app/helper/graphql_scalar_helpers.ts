let iothub = require('azure-iothub');
import {Device} from 'azure-iothub';
import {IoTHubDeviceInputType} from '../graphql/types/IoTHubDeviceInputType';
import {IoTHubDeviceCapabilitityInputType} from '../graphql/types/IoTHubDeviceCapabilitityInputType';
import {asyncForEach} from '../helper/array_util';
const DataLoader = require('dataloader');

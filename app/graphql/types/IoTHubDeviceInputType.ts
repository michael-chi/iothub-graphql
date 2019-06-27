import {IoTHubDeviceCapabilitityInputType} from './IoTHubDeviceCapabilitityInputType'
export class IoTHubDeviceInputType {
    public deviceId: string = '';
    //  TODO:
    //  -   Update IoTHubDeviceCapabilitityInputType to include [deviceIds!]! property
    public capabilitities?:IoTHubDeviceCapabilitityInputType;
}
  
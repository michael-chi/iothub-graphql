import {IoTHubDeviceCapabilitityInputType} from './IoTHubDeviceCapabilitityInputType'
import {IoTHubDeviceTwinInputType} from './IoTHubDeviceTwinPropertiesInputType';
export class IoTHubDeviceInputType {
    public deviceId: string = '';
    //  TODO:
    //  -   Update IoTHubDeviceCapabilitityInputType to include [deviceIds!]! property
    public capabilitities?:IoTHubDeviceCapabilitityInputType;
    public twinProperties?:IoTHubDeviceTwinInputType;
}
  
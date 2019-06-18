-   Query Devices
```
query test {
  devices{
    deviceId
    generationId
    etag
    cloudToDeviceMessageCount
  }
}
```

```
{"operationName":"iothub","variables":{"input":{"deviceId":"device001"}},"query":"query iothub($input: IoTHubDeviceInputType!) {\n  devices(input: $input) {\n    deviceId\n    generationId\n    etag\n    cloudToDeviceMessageCount\n    capabilities {\n      iotEdge\n    }\n  }\n}\n"}
```

```
{"operationName":"iothub","variables":{"input":{}},"query":"query iothub($input: IoTHubDeviceInputType!) {\n  devices(input: $input) {\n    deviceId\n    generationId\n    etag\n    cloudToDeviceMessageCount\n    capabilities {\n      iotEdge\n    }\n  }\n}\n"}
```
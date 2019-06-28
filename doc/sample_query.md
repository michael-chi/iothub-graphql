- Query DeviceTwin
```
{
	"operationName":"iothub",
	"variables":
		{"input":
			{"deviceId":"michi-visionaikit-001"}
		},
		"query":
			"query iothub($input: IoTHubDeviceInputType!) {\n  deviceTwins(input: $input) {\n    deviceId\n    etag\n}\n}\n"
	}
```

- Query Device with DeviceTwins
```
//  Query
query devices_query($input: [IoTHubDeviceInputType!]!) {
  devices(input: $input) {
    deviceId
    etag
    deviceTwins {
      deviceId
      moduleId
    }
    capabilities {
      iotEdge
    }
    modules {
      moduleId
      etag
      connectionState
    }
  }
}
//  Input
{
  "input": [
     {"deviceId": "device002"}
  ]
}
```

- Update or Create Device
```
//  Query
mutation device_mutation_test_001($input: [IoTHubDeviceInputType!]!) 
{  upsertDevice(input: $input) 
  {
    deviceId
    generationId
    etag
    cloudToDeviceMessageCount
    capabilities {
      iotEdge
    }
    modules{
      moduleId
      
    }
    deviceTwins{
      tags
      etag
      twinProperties
    }
  }
}
//  Input
{
  "input":
		[
      {
        "deviceId":"device002-20190627-001",
        "capabilities":{"iotEdge":true}
      }
    ]
}
```
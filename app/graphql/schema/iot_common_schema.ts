import { gql } from 'apollo-server';
// TODO:
//  I need to two types one for Input, another for Query output. Is there a better way ?
export let schema_IotHubCommons = gql`
type IoTHubSASKeyKeyPairType{
  primaryKey: String
  secondaryKey: String
}
type IoTHubAuthenticationType
{ 
  symmetricKey: IoTHubSASKeyKeyPairType
  x509Thumbprint: IoTHubCertificateThumbprintType
  type: String
}
type IoTHubCertificateThumbprintType {
  primaryThumbprint: String
  secondaryThumbprint: String
}

input IoTHubSASKeyKeyPairInputType{
  primaryKey: String
  secondaryKey: String
}
input IoTHubAuthenticationInputType
{ 
  symmetricKey: IoTHubSASKeyKeyPairInputType
  x509Thumbprint: IoTHubCertificateThumbprintInputType
  type: String
}
input IoTHubCertificateThumbprintInputType {
  primaryThumbprint: String
  secondaryThumbprint: String
}
input IoTHubDeviceCapabilitityInputType{
  iotEdge: Boolean
}

`;

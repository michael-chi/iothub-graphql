import { gql } from 'apollo-server';

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
`;

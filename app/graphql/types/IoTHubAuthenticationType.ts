export class IoTHubAuthenticationInputType {
  public symmetricKey?: IoTHubSASKeyKeyPairInputType;
  public x509Thumbprint?: IoTHubCertificateThumbprintInputType;
  public type: String = '';
}
  
export class IoTHubSASKeyKeyPairInputType{
    public primaryKey: string = '';
    public secondaryKey: string = '';
}

export class IoTHubCertificateThumbprintInputType {
  public primaryThumbprint: string = ''
  public secondaryThumbprint: string = ''
}
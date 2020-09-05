const {join} = require('path');
const {readFileSync} = require('fs');

const bufferAsHex = buffer => buffer.toString('hex');
const defaultCert = 'fullchain.pem';
const defaultKey = 'privkey.pem';
const port = 8081;

/** Get TLS credentials if present

  {
    env: <Environment Variables Object>
  }

  @throws
  <Error>

  @returns
  {
    [tls]: {
      cert: <Server Cert Hex String>
      key: <Server Key Hex String>
      port: <TLS Server Port Number>
    }
  }
*/
module.exports = ({env}) => {
  if (!env) {
    throw new Error('ExpectedEnvironmentVariablesToGetTlsCredentials');
  }

  // Exit early when there is no path to the certs
  if (!env.GATEWAY_TLS_CERTS_PATH) {
    return {};
  }

  const certFile = env.GATEWAY_TLS_CERT_FILENAME || defaultCert;
  const dir = env.GATEWAY_TLS_CERTS_PATH;
  const keyFile = env.GATEWAY_TLS_KEY_FILENAME || defaultKey;

  const cert = bufferAsHex(readFileSync(join(dir, certFile)));
  const key = bufferAsHex(readFileSync(join(dir, keyFile)));

  return {tls: {cert, key, port}};
};

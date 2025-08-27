import axios from 'axios';
import { ConfigService } from '@nestjs/config';

const getIssuedVC = async () => {
  const config = new ConfigService();
  const url = config.get('DID_ISSUER_URL');
  const username = config.get('ISSUER_USERNAME');
  const password = config.get('ISSUER_PASSWORD');
  const schemaType = config.get('SCHEMA_TYPE');
  const encodedValue = Buffer.from(`${username}:${password}`).toString('base64');
  const issuerDID = config.get('ISSUER_DID');
  const headers = {
    Authorization: `Basic ${encodedValue}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = schemaType
      ? await axios.get(
          `${url}v2/identities/${issuerDID}/credentials?type=[ "VerifiableCredential", "giga" ]`,
          { headers },
        )
      : await axios.get(`${url}v2/identities/${issuerDID}/credentials`, { headers });
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

const getLink = async id => {
  const config = new ConfigService();
  const url = config.get('DID_ISSUER_URL');
  const username = config.get('ISSUER_USERNAME');
  const password = config.get('ISSUER_PASSWORD');
  const schemaType = config.get('SCHEMA_TYPE');
  const encodedValue = Buffer.from(`${username}:${password}`).toString('base64');
  const issuerDID = config.get('ISSUER_DID');
  const headers = {
    Authorization: `Basic ${encodedValue}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.get(
      `${url}v2/identities/${issuerDID}/credentials/${id}/offer?type=universalLink`,
      { headers },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { getIssuedVC, getLink };

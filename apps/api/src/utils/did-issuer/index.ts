import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { encodeBase64, ethers } from 'ethers';

const getIssuedVC = async() =>{
    const config = new ConfigService();
    const url = config.get('DID_ISSUER_URL');
    const username = config.get('ISSUER_USERNAME');
    const password = config.get('ISSUER_PASSWORD');
    console.log({username, password,url})
    const encodedValue = Buffer.from(`${username}:${password}`).toString('base64');
    console.log({encodedValue})
    const issuerDID = config.get('ISSUER_DID');
    const headers = {
        'Authorization': `Basic ${encodedValue}`,
        'Content-Type': 'application/json',
    }
    try{
        const response = await axios.get(`${url}v2/identities/${issuerDID}/credentials/links`,{headers});
        console.log(response.data);
        return response.data;

    }
    catch (error) {
        console.log(error)
    }   
}

export default getIssuedVC;
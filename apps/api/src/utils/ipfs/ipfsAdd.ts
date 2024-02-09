import axios from 'axios';
import * as FormData from 'form-data'
import { ConfigService } from '@nestjs/config';

const IPFS_GATEWAY = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

const uploadFile = async file => {
    const config = new ConfigService();
    try {
    let data = new FormData();
    data.append("file", file, {filename: 'image.png'})
    const apiKey = config.get('IPFS_API_KEY')
    const apiSecret = config.get('IPFS_API_SECRET')
    let hash;

     await axios.post(IPFS_GATEWAY,data,{
        maxBodyLength:Infinity,
        headers:{
            'Content-Type':`multipart/form-data;boundary=${(data as any)._boundary}`,
            pinata_api_key:apiKey,
            pinata_secret_api_key:apiSecret
        }
    }).then(function(response){
        hash = response.data.IpfsHash
    }).catch(function(err){
        console.log('err')
        throw Error(err);
    })
    return hash;
    }
    catch (error) {
        console.log(error)
    }
}
export default uploadFile
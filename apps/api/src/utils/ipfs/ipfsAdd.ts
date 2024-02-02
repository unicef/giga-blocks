import axios from 'axios';
import * as FormData from 'form-data'

const IPFS_GATEWAY = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

const uploadFile = async file => {
    try {
    let data = new FormData();
    data.append("file", file, {filename: 'image.png'})
    const apiKey = '59ce1491ebf736b84f6a'
    const apiSecret = '94bc0fffba9e6cf08c5130951abe4bbdfb7d3542cc41079a2699722bfa811389'
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
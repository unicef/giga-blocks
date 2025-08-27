import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';



export const checkTransactionHash = async(txHash:string) =>{
    const config = new ConfigService();
    const rpcurl = config.get('NETWORK_PROVIDER');
    const provider = new ethers.JsonRpcProvider(rpcurl);
    try {
        const receipt = await provider.getTransactionReceipt(txHash);
        if(receipt){
            if (receipt.status === 1) {
                return {
                    status: 'success',
                    message: 'Transaction was successful',
                };
            } else {
                return {
                    status: 'failed',
                    message: 'Transaction failed',
                };
            }
        }
        return {
            status: 'Pending',
            message: 'Transaction not found',
        };
        
    }
    catch (error) {
        console.error(`Error checking transaction status: ${error}`);
        return {
            status: 'error',
            message: error.message,
        };
    }

}
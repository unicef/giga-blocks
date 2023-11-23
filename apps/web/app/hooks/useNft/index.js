import {ethers} from 'ethers';

import { useSellerContract } from '../useContract';

const sellerContract = useSellerContract();

export const usePurchaseNft =(tokenId,toAddress,account)=>{
    const purchaseNft = async ()=>{
        const tx = await sellerContract.purchaseNft(tokenId,toAddress).send({from:account});
        const receipt = await tx.wait();
        return receipt;
    }
    return purchaseNft;
}
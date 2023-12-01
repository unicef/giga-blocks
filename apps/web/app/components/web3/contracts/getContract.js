import {useWeb3React} from '@web3-react/core';
import { useMemo } from 'react';
import Web3 from "web3"

import GigaSeller from '../../../constants/abi/GigaSeller.json';

export const useLibrary = ()=>{
    const {provider,chainId} = useWeb3React();
    return useMemo(()=>{
        if(!chainId || !provider){
            return null;
        }
        else {
            return provider
        }
    },[chainId,provider])

}

export const getContract  = (abi,address)=>{
    const provider = useLibrary();
    if(!provider  || !abi) return null;
    const web3 = new Web3 (provider.provider);
    const contract = new web3.eth.Contract(abi,address);
    return contract;
}

export const getGigaSellerContract = (address)=>{
    return getContract(GigaSeller.abi,address);
}

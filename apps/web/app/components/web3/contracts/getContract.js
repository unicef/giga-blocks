import {useWeb3React} from '@web3-react/core';
import { useMemo } from 'react';
import Web3 from "web3"

// export const getWeb3 = (chainId)=>{

// }
export const useLibrary = ()=>{
    const {provider,chainId} = useWeb3React();
    return useMemo(()=>{
        if(!chainId || !provider){
            return null;
        }
        else {
            return new Web3(provider);
        }
    },[chainId,provider])

}

export const getContract  =(abi,address)=>{
    const library = useLibrary();
    if(!library  || !abi) return null;
    const contract =  new library.eth.Contract(abi,address);
    return contract;

}
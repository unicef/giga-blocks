import {useWeb3React} from '@web3-react/core';
import { useMemo } from 'react';

// export const getWeb3 = (chainId)=>{

// }
export const useLibrary = ()=>{
    const {provider,chainId} = useWeb3React();
    return useMemo(()=>{
        if(!chainId || !provider){
            return null;
        }
        else return provider
    },[chainId,provider])

}

export const getContract  =()=>{
    const library = useLibrary();

    // if(!library  || !abi) return null;
    const contract =  new library.eth.Contract(abi,address);
    return contract;

}
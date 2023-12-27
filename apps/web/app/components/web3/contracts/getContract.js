import {useWeb3React} from '@web3-react/core';
import { useMemo } from 'react';
import Web3 from "web3"
import {Contract, ContractRunner,InterfaceAbi} from 'ethers';

import GigaSeller from '../../../constants/abi/GigaSeller.json';
import NFT from '../../../constants/abi/NFT.json'

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
    // const provider = useLibrary();
    // if(!provider  || !abi) return null;
    const web3 = new Web3 ("https://goerli-rollup.arbitrum.io/rpc");
    const contract = new web3.eth.Contract(abi,address);
    return contract;
}

export const getSignerContract = (abi,address)=>{
    const provider = useLibrary();
    if(!provider  || !abi) return null;
    const contract = new Contract(address,abi,provider.getSigner());
    // const web3 = new Web3 (provider.provider);
    // const contract = new web3.eth.Contract(abi,address);
    return contract;
}

export const getGigaSellerContract = (address)=>{
    return getContract(GigaSeller.abi,address);
}

export const getNftContract = (address) =>{
    return getContract(NFT.abi,address);
}


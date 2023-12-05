import GigaSeller from '../../components/web3/abis/NFTSeller.json';
import { getContract, getSignerContract } from '../../components/web3/contracts/getContract';

export const useSellerContract= ()=>{
    const address = process.env.NEXT_PUBLIC_GIGA_SELLER_ADDRESS;
    const contract = getContract(GigaSeller.abi,address);
    return contract;
}

export const useSignerSellerContract = ()=>{
    const address = process.env.NEXT_PUBLIC_GIGA_SELLER_ADDRESS;
    const contract = getSignerContract(GigaSeller.abi,address);
    return contract;
}

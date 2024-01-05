import { metaMask } from '../components/web3/connectors/metamask';
import { Default_Chain_Explorer, Default_Chain_Id, Default_Chain_URL } from '../components/web3/connectors/network';
import { ethers } from 'ethers';

export const metaMaskLogin = async () => {
  let res;
  try {
    res = await metaMask.activate(Default_Chain_Id);
    return res;
  } catch (err) {
    if (err.code === 4902) {
      return await switchMetaMaskNetwork();
    }
    else if(err.code === 4001){
      throw new Error('User rejected signature.');
    }
   else throw new Error(err);
  }
};

export const metaMaskLogout = async () => {
  try {
    await metaMask.resetState();
    localStorage.clear();
  } catch (err) {
    console.log(err);
  }
};

export const switchMetaMaskNetwork = async () => {
  const network = {
    chainId: Default_Chain_Id,
    chainName: 'Polygon-Mumbai',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'Matic',
      decimals: 18,
    },
    rpcUrls: [Default_Chain_URL],
    blockExplorerUrls: [Default_Chain_Explorer],
  };
  const res = await metaMask.activate(network);
  return res;
};

export const checkWalletAddress = async(address)=>{
  const isAddress =  ethers.isAddress(address);
  return isAddress;
}

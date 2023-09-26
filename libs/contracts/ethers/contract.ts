import { ethers } from 'ethers';

import { getAbi } from './abi';

const network = process.env.NETWORK_PROVIDER;

export const getContract = (contractName: string, contractAddress: string) => {
  try {
    const provider = new ethers.JsonRpcProvider(network);
    const abi = getAbi(contractName);
    const contract = new ethers.Contract(contractAddress, abi.abi, provider);
    console.log(contract);
    return contract;
  } catch (err) {
    throw new Error(`Error: ${err}, message: Cannot instatntiate contract`);
  }
};


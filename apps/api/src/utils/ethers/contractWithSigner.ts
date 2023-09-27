import { Contract } from 'contracts';
import { ethers } from 'ethers';

export const getContractWithSigner = (contractName: string, contractAddress: string) => {
  const contractObj = new Contract(process.env.NETWORK_PROVIDER);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY);
  const contract = contractObj.getContract(contractName, contractAddress);
  const contractWithSigner = contract.connect(signer);
  return contractWithSigner;
};

import { Contract } from '@contracts';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

export const getContractWithSigner = (contractName: string, contractAddress: string) => {
  const config = new ConfigService();
  const contractObj = new Contract(config.get('NETWORK_PROVIDER'));
  const contract = contractObj.getContract('NFTContent', '0x8f854D9e8968a69357fd01B71d24C3BAD53E39cF');
  const contractWithSigner = contract.connect(getSigner());
  return contractWithSigner;
};

export const getSigner = () => {
  const config = new ConfigService();
  const provider = new ethers.JsonRpcProvider(config.get('NETWORK_PROVIDER'));
  const signer = new ethers.Wallet(config.get('PRIVATE_KEY'), provider);
  return signer;
};

export const getInterface = (contractName: string) => {
  const config = new ConfigService();
  const contractObj = new Contract(config.get('NETWORK_PROVIDER'));
  const iface = contractObj.getInterface(contractName);
  return iface;
};

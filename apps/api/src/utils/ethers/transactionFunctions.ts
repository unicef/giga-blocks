import { getContractWithSigner, getInterface } from './contractWithSigner';
import { ConfigService } from '@nestjs/config';

export const mintNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: [],
) => {
  const config = new ConfigService();
  const escrowAddress = config.get('ESCROW_ADDRESS');
  const contract: any = getContractWithSigner(contractName, contractAddress);
  const schoolArgs = schoolDataArray.map(el => [escrowAddress, escrowAddress, el]);
  const multicalldata = generateMultiCallData(contractName, 'safeMint', schoolArgs);
  const tx = await contract.multicall(multicalldata);
  return tx;
};

const generateMultiCallData = (contractName, functionName, callData) => {
  const iface: any = getInterface(contractName);
  const encodedData = [];
  if (callData) {
    for (const callD of callData) {
      const encodedD = iface.interface.encodeFunctionData(functionName, [...callD]);
      encodedData.push(encodedD);
    }
  }
  return encodedData;
};

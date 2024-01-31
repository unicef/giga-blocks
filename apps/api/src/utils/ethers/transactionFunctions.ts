import { getContractWithSigner, getInterface } from './contractWithSigner';
import { ConfigService } from '@nestjs/config';

export const mintNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: (string | boolean | number)[][],
  giga_ids: string[],
) => {
  const config = new ConfigService();
  const escrowAddress = config.get('NEXT_PUBLIC_GIGA_ESCROW_ADDRESS');
  const contract: any = getContractWithSigner(contractName, contractAddress);
  const schoolArgs = schoolDataArray.map((el, i) => [
    giga_ids[i],
    escrowAddress,
    escrowAddress,
    el,
  ]);
  const multicalldata = generateMultiCallData(contractName, 'mintNft', schoolArgs);
  const tx = await contract.multicall(multicalldata);
  return tx;
};

export const mintSingleNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: (string | boolean | number)[],
  giga_id: string,
) => {
  const config = new ConfigService();
  const escrowAddress = config.get('NEXT_PUBLIC_GIGA_ESCROW_ADDRESS');
  const contract: any = getContractWithSigner(contractName, contractAddress);
  const schoolArgs = [giga_id, escrowAddress, escrowAddress, schoolDataArray];
  const tx = await contract.mintNft(...schoolArgs);
  return tx;
};

const generateMultiCallData = (contractName, functionName, callData) => {
  const iface: any = getInterface(contractName);
  const encodedData = [];
  if (callData) {
    for (const callD of callData) {
      const encodedD = iface.encodeFunctionData(functionName, [...callD]);
      encodedData.push(encodedD);
    }
  }
  return encodedData;
};

export const updateData = async (
  contractName: string,
  contractAddress: string,
  tokenId: string,
  schoolDataArray: (string | boolean | number)[],
) => {
  const contract: any = getContractWithSigner(contractName, contractAddress);
  const tx = await contract.updateNftContent(tokenId, schoolDataArray);
  return tx;
};

export const getTokenIdSchool = async (
  contractName: string,
  contractAddress: string,
  schoolId: string,
) => {
  const contract:any = getContractWithSigner(contractName, contractAddress);
  console.log('tx')

  const tx = await contract.schoolIdToTokenId(1)
 
  return tx;
};

export const getArtScript = async (
  contractName: string,
  contractAddress: string,
  tokenId: string,
) => {
  const contract: any = getContractWithSigner(contractName, contractAddress);
  const tx = await contract.getArtScript(tokenId);
  return tx;
};

export const updateBulkData = async (
  contractName: string,
  contractAddress: string,
  tokenId: string[],
  schoolDataArray: (string | boolean | number)[][],
) => {
  const contract: any = getContractWithSigner(contractName, contractAddress);
  const schoolArgs = tokenId.map((el, i) => [el, schoolDataArray[i]]);
  const multicalldata = generateMultiCallData(contractName, 'updateNftContent', schoolArgs);
  const tx = await contract.multicall(multicalldata);
  return tx;
};

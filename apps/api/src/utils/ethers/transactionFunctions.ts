import { BaseContract, ContractTransactionResponse } from 'ethers';
import { getContractWithSigner, getInterface } from './contractWithSigner';
import { ConfigService } from '@nestjs/config';
// import getProposedGasPrice from '../gasPrice';

interface ExtendedContract extends BaseContract {
  updateNftImageHash?: (schoolId: string, tokenHash: string) => ContractTransactionResponse;
  multicall?: (multicalldata) => ContractTransactionResponse;
  mintNft?: any;
  updateNftContent?: (tokenId: string, schoolDataArray: any[]) => ContractTransactionResponse;
  schoolIdToTokenId?: (
    schoolId: string | ContractTransactionResponse,
  ) => ContractTransactionResponse;
  getArtScript?: (tokenId: string | ContractTransactionResponse) => ContractTransactionResponse;
  nftImageHash?: (tokenHash: string) => ContractTransactionResponse;
  getRandomImages?: (region:string,tokenId: string | ContractTransactionResponse) => ContractTransactionResponse;
  getImage?: (imageName: string | ContractTransactionResponse) => ContractTransactionResponse;
  nftContentValues?:(tokenId: string | ContractTransactionResponse) => ContractTransactionResponse;
}

export const mintNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: (string | boolean | number)[][],
  giga_ids: string[],
): Promise<ContractTransactionResponse> => {
  const config = new ConfigService();
  // const weiEthers = await getProposedGasPrice();
  const escrowAddress = config.get('NEXT_PUBLIC_GIGA_ESCROW_ADDRESS');
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  const schoolArgs = schoolDataArray.map((el, i) => [
    giga_ids[i],
    escrowAddress,
    escrowAddress,
    el,
  ]);
  const multicalldata = generateMultiCallData(contractName, 'mintNft', schoolArgs);
  return await contract.multicall(multicalldata);

  // return await contract.multicall(multicalldata, { gasPrice: weiEthers });
};

export const mintSingleNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: (string | boolean | number)[],
  giga_id: string,
): Promise<ContractTransactionResponse> => {
  const config = new ConfigService();
  const escrowAddress = config.get('NEXT_PUBLIC_GIGA_ESCROW_ADDRESS'); 
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.mintNft(giga_id, escrowAddress, escrowAddress, schoolDataArray);
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
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  // const weiEthers = await getProposedGasPrice();
  return await contract.updateNftContent(tokenId, schoolDataArray);

  // return await contract.updateNftContent(tokenId, schoolDataArray, { gasPrice: weiEthers });
};

export const getTokenIdSchool = async (
  contractName: string,
  contractAddress: string,
  schoolId: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.schoolIdToTokenId(schoolId);
};

export const getArtScript = async (
  contractName: string,
  contractAddress: string,
  tokenId: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getArtScript(tokenId);
};


export const getSchoolData = async(
  contractName: string,
  contractAddress: string,
  tokenId: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.nftContentValues(tokenId);
}


export const getRandomImages = async (
  contractName: string,
  contractAddress: string,
  region: string,
  tokenId: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getRandomImages(region,tokenId);
}

export const getImage = async(
  contractName: string,
  contractAddress: string,
  imageName: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getImage(imageName);
}



export const updateImageHash = async (
  contractName: string,
  contractAddress: string,
  tokenHash: string,
  schoolId: string,
): Promise<ContractTransactionResponse> => {
  // const weiEthers = await getProposedGasPrice();
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.updateNftImageHash(schoolId, tokenHash);

  // return await contract.updateNftImageHash(schoolId, tokenHash, { gasPrice: weiEthers });
};

export const getTokenHash = async (
  contractName: string,
  contractAddress: string,
  tokenHash: string,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.nftImageHash(tokenHash);
};

export const updateBulkData = async (
  contractName: string,
  contractAddress: string,
  tokenId: string[],
  schoolDataArray: (string | boolean | number)[][],
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  // const weiEthers = await getProposedGasPrice();
  const schoolArgs = tokenId.map((el, i) => [el, schoolDataArray[i]]);
  const multicalldata = generateMultiCallData(contractName, 'updateNftContent', schoolArgs);
  return await contract.multicall(multicalldata);
  // return await contract.multicall(multicalldata, { gasPrice: weiEthers });
};

export const getScriptData = async (
  contentcontractAddress: string,
  imagecontractAddress: string,
  schoolId:string,
):Promise<any> => {
  const contentcontract: ExtendedContract = getContractWithSigner("NFTContent", contentcontractAddress);
  const imagecontract: ExtendedContract = getContractWithSigner("ImageContent", imagecontractAddress);
  const tokenId = await contentcontract.schoolIdToTokenId(schoolId);
  const nftcontents = await contentcontract.nftContentValues(tokenId);
  const randomImages = await imagecontract.getRandomImages(nftcontents[8],tokenId);
  const baseImage1 = await imagecontract.getImage(randomImages[0]);
  const baseImage2 = await imagecontract.getImage(randomImages[1]);
  //need to convert the image data to base64 encoded value.
   const data = {
      tokenId,
      nftcontents,
      baseImage1,
      baseImage2
   }
   return data;
}


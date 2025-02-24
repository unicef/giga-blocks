import { BaseContract, ContractTransactionResponse, ethers } from 'ethers';
import { getContractWithSigner, getInterface, getSigner } from './contractWithSigner';
import { ConfigService } from '@nestjs/config';
import { getTokenId, getTokensId } from '../web3/subgraph';
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
  getRandomImages?: (
    region: string,
    tokenId: string | ContractTransactionResponse,
  ) => ContractTransactionResponse;
  getImage?: (imageName: string | ContractTransactionResponse) => ContractTransactionResponse;
  getMetadataContent?: (tokenId: string | ContractTransactionResponse) => any;
  tokenIdToTokenHash?: (tokenId: string | ContractTransactionResponse) => any;
  addHashes?: (date: string, hashes: string[]) => ContractTransactionResponse;
}

export const mintNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: (string | boolean | number)[][],
  giga_ids: string[],
): Promise<ContractTransactionResponse> => {
  const config = new ConfigService();
  console.log(schoolDataArray);
  // const weiEthers = await getProposedGasPrice();
  const escrowAddress = config.get('NEXT_PUBLIC_GIGA_ESCROW_ADDRESS');
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  const schoolArgs = schoolDataArray.map((el, i) => [
    giga_ids[i],
    escrowAddress,
    escrowAddress,
    [...el, 'Nepal'],
  ]);

  const multicalldata = generateMultiCallData(contractName, 'mintNft', schoolArgs);
  console.log(multicalldata, 'is multicall data');
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

export const getSchoolData = async (
  contractName: string,
  contractAddress: string,
  tokenId: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getMetadataContent(tokenId);
};

export const getRandomImages = async (
  contractName: string,
  contractAddress: string,
  region: string,
  tokenId: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getRandomImages(region, tokenId);
};

export const getImage = async (
  contractName: string,
  contractAddress: string,
  imageName: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getImage(imageName);
};

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
): Promise<any> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);

  const schoolTokenIds = await getTokensId(
    process.env.NEXT_PUBLIC_GRAPH_URL ||
      'https://api.studio.thegraph.com/query/74692/giga-research/version/latest/',
    tokenId,
  );
  const schoolDatas = await processSchoolData(schoolDataArray, schoolTokenIds.data.schoolTokenIds);
  const schoolArgs = schoolDatas.tokenId.map((ti, i) => [ti, schoolDatas.schoolData[i]]);

  const multicalldata = generateMultiCallData(contractName, 'updateNftContent', schoolArgs);
  return contract.multicall(multicalldata);
  // return await contract.multicall(multicalldata, { gasPrice: weiEthers });
};

export const getScriptData = async (
  contentcontractAddress: string,
  imagecontractAddress: string,
  schoolId: string,
): Promise<any> => {
  const contentcontract: ExtendedContract = getContractWithSigner(
    'NFTContent',
    contentcontractAddress,
  );
  const imagecontract: ExtendedContract = getContractWithSigner(
    'ImageContent',
    imagecontractAddress,
  );
  //get tokenId from schoolId
  const tokenId = await contentcontract.schoolIdToTokenId(schoolId);
  //get nft contents from tokenId
  const nftcontents = await contentcontract.getMetadataContent(tokenId);
  let sanitizedResponse = `{${nftcontents}}`.replace(/(\w+):/g, '"$1":'); // Add curly braces and quote property names
  sanitizedResponse = sanitizedResponse.replace(/,(\s*})/g, '$1'); // Remove trailing commas
  const formattedResponse = JSON.parse(sanitizedResponse);
  const tokenHash = await contentcontract.tokenIdToTokenHash(tokenId);
  //get random images from region and tokenId
  const randomImages = await imagecontract.getRandomImages(formattedResponse?.region, tokenHash);
  //get image data from image name
  const image1 = await imagecontract.getImage(randomImages[0]);
  const image2 = await imagecontract.getImage(randomImages[1]);
  //converts image bytes  into base64 encoded image
  const baseImage1 = await getEncodedImage(image1);
  const baseImage2 = await getEncodedImage(image2);
  const data = {
    tokenId,
    nftcontents: formattedResponse,
    baseImage1,
    baseImage2,
    tokenHash,
  };
  if (!baseImage1 || !baseImage2) throw new Error('Error in fetching images');
  return data;
};

export const addArweaveHash = async (contractName, contractAddress, hashes) => {
  const qosContract: ExtendedContract = getContractWithSigner(contractName, contractAddress);

  const date = new Date();

  return qosContract.addHashes(date.toString(), hashes);
};

const getEncodedImage = async (imageData: any) => {
  const base64 = `${ethers.encodeBase64(imageData)}`;
  return base64;
};

const processSchoolData = async (schoolDataArray: any[], tokenIds: any[]) =>
  schoolDataArray.reduce(
    (acc, school) => {
      const matchingToken = tokenIds.find(token => token.schoolId === school[0]);
      if (matchingToken) {
        acc.schoolData.push(Object.values(school).slice(1));
        acc.tokenId.push(matchingToken.tokenId);
      }
      return acc;
    },
    { schoolData: [], tokenId: [] },
  );

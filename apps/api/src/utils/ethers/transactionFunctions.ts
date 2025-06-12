import { BaseContract, ContractTransactionResponse, ethers } from 'ethers';
import { getContractWithSigner, getInterface, getSigner } from './contractWithSigner';
import { ConfigService } from '@nestjs/config';
import { getTokenId, getTokensId } from '../web3/subgraph';
import getProposedGasPrice from '../gasPrice';

interface ExtendedContract extends BaseContract {
  updateNftImageHash?: (schoolId: string, tokenHash: string) => ContractTransactionResponse;
  multicall?: (multicalldata) => ContractTransactionResponse;
  mintNft?: any;
  updateNftContent?: (tokenId: string, schoolDataArray: any[]) => ContractTransactionResponse;
  schoolIdToTokenId?: (
    schoolId: string | ContractTransactionResponse,
  ) => ContractTransactionResponse;
  getArtScriptByIndex?: (index: number) => ContractTransactionResponse;
  nftImageHash?: (tokenHash: string) => ContractTransactionResponse;
  getRandomImages?: (
    region: string,
    tokenId: string | ContractTransactionResponse,
  ) => ContractTransactionResponse;
  getImage?: (imageName: string | ContractTransactionResponse) => ContractTransactionResponse;
  getNftContentValues?: (tokenId: string | ContractTransactionResponse) => any;
  tokenIdToTokenHash?: (tokenId: string | ContractTransactionResponse) => any;
  addHashes?: (date: string, hashes: string[]) => ContractTransactionResponse;
  reserveNft?: (schoolId: string, email: string) => ContractTransactionResponse;
  transfeReservedNft?: (walletAddress: string, email: string) => ContractTransactionResponse;
}

export const mintNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: (string | boolean | number)[][],
  giga_ids: string[],
): Promise<ContractTransactionResponse> => {
  const config = new ConfigService();
  const weiEthers = await getProposedGasPrice();
  const collectorescrowAddress = config.get('NEXT_PUBLIC_GIGA_COLLECTOR_ESCROW_ADDRESS');
  const schoolescrowAddress = config.get('NEXT_PUBLIC_GIGA_SCHOOL_ESCROW_ADDRESS');

  const contract: any = getContractWithSigner(contractName, contractAddress);
  const schoolArgs = schoolDataArray.map((el, i) => [
    giga_ids[i],
    schoolescrowAddress,
    collectorescrowAddress,
    [...el],
  ]);

  const multicalldata = generateMultiCallData(contractName, 'mintNft', schoolArgs);
  return await contract.multicall(multicalldata, { gasPrice: weiEthers });

  // return await contract.multicall(multicalldata, { gasPrice: weiEthers });
};

export const mintSingleNFT = async (
  contractName: string,
  contractAddress: string,
  schoolDataArray: (string | boolean | number)[],
  giga_id: string,
): Promise<ContractTransactionResponse> => {
  const config = new ConfigService();
  const collectorescrowAddress = config.get('NEXT_PUBLIC_GIGA_COLLECTOR_ESCROW_ADDRESS');
  const schoolescrowAddress = config.get('NEXT_PUBLIC_GIGA_SCHOOL_ESCROW_ADDRESS');
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.mintNft(
    giga_id,
    schoolescrowAddress,
    collectorescrowAddress,
    schoolDataArray,
  );
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
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getArtScriptByIndex(0);
};

export const getSchoolData = async (
  contractName: string,
  contractAddress: string,
  tokenId: string | ContractTransactionResponse,
): Promise<ContractTransactionResponse> => {
  const contract: ExtendedContract = getContractWithSigner(contractName, contractAddress);
  return await contract.getNftContentValues(tokenId);
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
  try {
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
    const nftcontents = await contentcontract.getNftContentValues(tokenId);
    console.log('nftcontents', nftcontents);
      //incase of encoded data
//     let sanitizedResponse = `{${nftcontents}}`.replace(/(\w+):/g, '"$1":'); // Add curly braces and quote property names
//     console.log('sanitizedResponse', sanitizedResponse);
//     sanitizedResponse = sanitizedResponse.replace(/,(\s*})/g, '$1'); // Remove trailing commas
    const formattedResponse =
     {
      // schoolName: nftcontents[0],
      schoolType: nftcontents[1],
      country: nftcontents[2],
      longitude: nftcontents[3],
      latitude: nftcontents[4],
      connectivity: nftcontents[5],
      coverage_availabitlity: nftcontents[6],
      electricity_availabilty: nftcontents[7],
      region: nftcontents[8],
     }
    console.log('formattedResponse', formattedResponse);
    const tokenHash = await contentcontract.tokenIdToTokenHash(tokenId);
    //get random images from region and tokenId
    const randomImages = await imagecontract.getRandomImages(formattedResponse?.region, tokenHash);
    //get image data from image name
    const image1 = await imagecontract.getImage(randomImages[0]);
    const image2 = await imagecontract.getImage(randomImages[1]);
    //converts image bytes  into base64 encoded image
    // const baseImage1 = await getEncodedImage(image1);
    // const baseImage2 = await getEncodedImage(image2);
    const data = {
      tokenId,
      nftcontents: formattedResponse,
      baseImage1: image1,
      baseImage2: image2,
      tokenHash,
    };
    if (!image1 || !image1) throw new Error('Error in fetching images');
    return data;
  } catch (error) {
    console.error('Error in getScriptData:', error);
    throw new Error(`Error in getScriptData,${error?.message}`);
  }
};

export const addArweaveHash = async (contractName, contractAddress, hashes) => {
  const qosContract: ExtendedContract = getContractWithSigner(contractName, contractAddress);

  const date = new Date();

  return qosContract.addHashes(date.toString(), hashes);
};

export const reserveNft = async (schoolId: string, email: string) => {
  const config = new ConfigService();
  const contractAddress = config.get('NEXT_PUBLIC_GIGA_COLLECTOR_ESCROW_ADDRESS');
  const contract: ExtendedContract = getContractWithSigner('Escrow', contractAddress);
  const res = await getTokenIdSchool(
    'NFTContent',
    config.get('GIGA_NFT_CONTENT_ADDRESS'),
    schoolId,
  );
  const tokenId = res.toString();
  return contract.reserveNft(tokenId, email);
};

export const claimNft = async (walletAddress: string, email: string) => {
  const config = new ConfigService();
  const contractAddress = config.get('NEXT_PUBLIC_GIGA_COLLECTOR_ESCROW_ADDRESS');
  const contract: ExtendedContract = getContractWithSigner('Escrow', contractAddress);
  return contract.transfeReservedNft(walletAddress, email);
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

import { getContractWithSigner } from './contractWithSigner';

export const mintNFT = async (
  contractName: string,
  contractAddress: string,
  toAddress: string,
  tokenURI: string,
) => {
  const contract: any = await getContractWithSigner(contractName, contractAddress);

  const tx = await contract.safeMint(toAddress, tokenURI);
  return tx;
};

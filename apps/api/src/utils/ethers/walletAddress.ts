import { ethers } from 'ethers';

export const getWalletAddressFromPK = (privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
};
export const getWalletAddressFromMenomonics = (menomonics: string) => {
  const wallet = ethers.Wallet.fromPhrase(menomonics);
  return wallet.address;
};

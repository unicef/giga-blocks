import { recover } from 'web3-eth-accounts';
import { toChecksumAddress } from 'web3-utils';
import { totp } from 'otplib';

export const getAddressfromSignature = async (signatureWithData: string) => {
  if (!signatureWithData) {
    throw new Error('No signature provided');
  }
  const [data, signature] = signatureWithData.split(':');
  if (!totp.verify({ token: data, secret: process.env.OTP_SECRET })) throw Error('Invalid Nonce');
  const recoverText = data;
  const address = recover(recoverText, signature);
  return getChecksumAddress(address);
};

export const getChecksumAddress = (address: string): string => {
  return toChecksumAddress(address);
};

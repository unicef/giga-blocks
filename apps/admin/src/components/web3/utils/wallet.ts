
export const loginSignature = async (config: any, nonce: string) => {
  if (!config.provider || !config.account) return;
  let signature = await config.provider.getSigner(config.account).signMessage(nonce);
  signature = `${nonce}:${signature}`;
  return signature;
}

export const mintSignature = async(signer:any, batchNumber:string) =>{
  const signingMessage = `I am going to mint nfts for ${batchNumber} of schoools`
  let signature = await signer.signMessage(signingMessage);
  signature = `${batchNumber}:${signingMessage}${signature}`;
  return signature;
}

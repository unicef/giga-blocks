
export const loginSignature = async (signer: any, nonce: string) => {
  if(!signer || !nonce) return;
  let signature = await signer.signMessage(nonce);
  signature = `${nonce}:${signature}`;
  return signature;
}

export const mintSignature = async(signer:any, batchNumber:string) =>{
  if(!signer || !batchNumber) return;
  const signingMessage = `I am going to mint nfts for ${batchNumber} of schoools`
  let signature = await signer.signMessage(signingMessage);
  signature = `${batchNumber}:${signingMessage}${signature}`;
  return signature;
}

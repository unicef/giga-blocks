
import { arweave } from './config/arweaveNetwork';
import { key } from './constants/key';

export const store = async (qosData) => {

  const balance = await arweave.wallets.getBalance(await arweave.wallets.jwkToAddress(key));
  console.log("Wallet Balance:", arweave.ar.winstonToAr(balance));

  const transaction = await createAndSignTransaction(qosData);

  await arweave.transactions.sign(transaction, key);

  let uploader = await arweave.transactions.getUploader(transaction);
  
    while (!uploader.isComplete) {
        await uploader.uploadChunk();
    }
  
    const balanceAfter = await arweave.wallets.getBalance(await arweave.wallets.jwkToAddress(key));
    console.log("Wallet Balance:", arweave.ar.winstonToAr(balanceAfter));  
  
  return transaction.id;
}

const createAndSignTransaction = async (jsonObject: any) => {

    const jsonString = JSON.stringify(jsonObject);
    
    const dataTransaction = await arweave.createTransaction({
      data: jsonString,
    }, key)
    
    await arweave.transactions.sign(dataTransaction, key)
    await arweave.transactions.post(dataTransaction)
    let transaction = await arweave.createTransaction({
      data: jsonString
    }, key);
  
    transaction.addTag('Content-Type', 'image/png');

    return transaction;
}

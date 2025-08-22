import * as fs from 'fs';
import { arweave } from './arweaveNetwork';
// import { key } from '../constants/key'

// Generate wallet key
(async () => {
  const key = await arweave.wallets.generate();
  fs.writeFileSync('./wallet.json', JSON.stringify(key));
// // 
  const walletAddress = await arweave.wallets.jwkToAddress(key);

 const res =  await arweave.api.get(`/mint/${walletAddress}/100000000000000000000000`);
    const balance = await arweave.wallets.getBalance(walletAddress);
    console.log("Wallet Balance:", balance);


  console.log("Created and funded arweave account", walletAddress)
})();


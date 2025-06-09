import * as fs from 'fs';
import { arweave } from './arweaveNetwork';

// Generate wallet key
(async () => {
  const key = await arweave.wallets.generate();
  fs.writeFileSync('./wallet.json', JSON.stringify(key));

  const walletAddress = await arweave.wallets.jwkToAddress(key);

  console.log(arweave.api);

  await arweave.api.get(`/mint/${walletAddress}/10000000000000000000000`);

  console.log("Created and funded arweave account", walletAddress)
})();


import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';

import { URLS } from '../chains';

 const DataUrl = {
  [80001]: 'https://polygon-mumbai.infura.io/v3/627efc2e63b5449eaf60728ea083fa9d',
  [11155111]:'https://eth-sepolia.g.alchemy.com/v2/WSfPp7PZYjX8uXeDOFfk_GFBBSCrCyxg'
  // [137]: 'https://api.polygonscan.com/api',
  // [421613]:'https://goerli-rollup.arbitrum.io/rpc',
};

export const Default_Chain_Id = 11155111;
export const Default_Chain_URL = DataUrl[Default_Chain_Id];
export const Default_Chain_Explorer = 'https://sepolia.etherscan.io/';


export const [network, hooks] = initializeConnector(
  (actions) => new Network({ actions, urlMap: DataUrl })
);

import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';

import { URLS } from '../chains';

 const DataUrl = {
  [80001]: 'https://rpc-mumbai.maticvigil.com',
  // [137]: 'https://api.polygonscan.com/api',
  // [421613]:'https://goerli-rollup.arbitrum.io/rpc',
};

export const Default_Chain_Id = 80001;


export const [network, hooks] = initializeConnector(
  (actions) => new Network({ actions, urlMap: DataUrl })
);

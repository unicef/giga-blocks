import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';

import { URLS } from '../chains';

 const DataUrl = {
  [80001]: 'https://polygon-mumbai.infura.io/v3/627efc2e63b5449eaf60728ea083fa9d',
  // [137]: 'https://api.polygonscan.com/api',
  // [421613]:'https://goerli-rollup.arbitrum.io/rpc',
};

export const Default_Chain_Id = 80001;
export const Default_Chain_URL = DataUrl[Default_Chain_Id];
export const Default_Chain_Explorer = 'https://mumbai.polygonscan.com/';


export const [network, hooks] = initializeConnector(
  (actions) => new Network({ actions, urlMap: DataUrl })
);

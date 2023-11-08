import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';

import { URLS } from '../chains';

const DataUrl = {
  [80001]: 'https://api-testnet.polygonscan.com/api',
  [137]: 'https://api.polygonscan.com/api',
};

export const [network, hooks] = initializeConnector(
  (actions) => new Network({ actions, urlMap: DataUrl })
);

'use client';

import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import type { Network } from '@web3-react/network';
import type { Connector } from '@web3-react/types';



import { metaMask, hooks as metaMaskHooks } from './connectors/metaMask';
import { network, hooks as networkHooks } from './connectors/network';
// import { getName } from '../utils';

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
];

type Props = {
  children: React.ReactNode;
};


function Child({ children }: Props) {
  const { connector } = useWeb3React();
  console.log(`Priority Connector is: ${connector}`);
  return children;
}

export default function ProviderExample({ children }: Props) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child>{children}</Child>
    </Web3ReactProvider>
  );
}

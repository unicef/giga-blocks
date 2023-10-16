'use client';
import React from 'react';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { getName } from './utils/wrapper';

import { metaMask, hooks as metaMaskHooks } from './connectors/metamask';
import { network, hooks as networkHooks } from './connectors/network';

const connectors = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
];

function Child({ children }) {
  const { connector } = useWeb3React();
  console.log(`Priority Connector is: ${getName(connector)}`);
  return children;
}

export default function ProviderExample({ children }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child>{children}</Child>
    </Web3ReactProvider>
  );
}

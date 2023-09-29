'use client';

import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import type { Connector } from '@web3-react/types';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof Network) return 'Network';
  return 'Unknown';
}


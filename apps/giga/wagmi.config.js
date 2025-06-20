'use client';

import { create } from '@mui/material/styles/createTransitions';
import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const rpcURL = process.env.NEXT_PUBLIC_NETWORK_PROVIDER;
let config;
if (typeof window !== 'undefined') {
  config = createConfig(
    getDefaultConfig({
      chains: [
        // mainnet,
        // sepolia,
        // arbitrumGoerli,
        // polygon,
        // polygonMumbai,
        //   arbitrumSepolia,
        baseSepolia,
      ],
      batch: {
        multicall: true,
      },
      connectors: [
        walletConnect({
          showQrModal: false,
          projectId: 'fdfb7359857dc4dd413ecda05a551571',
        }),
        coinbaseWallet(),
        injected(),
      ],
      transports: {
        [baseSepolia.id]: http(
          `${rpcURL}`
            ? `${rpcURL}`
            : 'https://sepolia.infura.io/v3/b6dbb218527148febfaeb8ae2870b60e'
        ),
      },
      walletConnectProjectId: 'fdfb7359857dc4dd413ecda05a551571',
      // Required App Info
      appName: 'Giga',

      // Optional App Info
      appDescription:
        'An open-source blockchain-based financial access platform to support vulnerable communities.',
      appUrl: 'https://family.co', // your app's url
      appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
  );
}

export default config;

// export default defineConfig({
//   out: 'src/generated.ts',
//   contracts: [],
//   plugins: [],
// });

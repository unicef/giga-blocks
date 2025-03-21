'use client';

import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig(
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
      // walletConnect({
      //   projectId: '1234',
      // }),
      coinbaseWallet(),
    ],
    transports: {
      [baseSepolia.id]: http(
        'https://base-sepolia.g.alchemy.com/v2/T0PE-HxhWOEH0eUNTcUOFgPQJiQzL6uf'
      ),
    },
    walletConnectProjectId: '',
    // Required App Info
    appName: 'Giga',

    // Optional App Info
    appDescription:
      'An open-source blockchain-based financial access platform to support vulnerable communities.',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

// export default defineConfig({
//   out: 'src/generated.ts',
//   contracts: [],
//   plugins: [],
// });

import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';

import { GigaMinterAbi } from './abi/GigaMinter';
import { NftContentAbi } from './abi/NftContent';
import { QOSGigaAbi } from './abi/QOSGiga';
import { NFTAbi } from './abi/Nft';

const GigaConfig = [
  {
    out: 'apps/giga/app/hooks/useContract/gigaMinter.ts',
    contracts: [
      {
        name: 'GigaMinter',
        abi: GigaMinterAbi,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'apps/giga/app/hooks/useContract/nftContent.ts',
    contracts: [
      {
        name: 'NftContent',
        abi: NftContentAbi,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'apps/giga/app/hooks/useContract/qosGiga.ts',
    contracts: [
      {
        name: 'Qos',
        abi: QOSGigaAbi,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'apps/giga/app/hooks/useContract/gigaNft.ts',
    contracts: [
      {
        name: 'Nft',
        abi: NFTAbi,
      },
    ],
    plugins: [react()],
  },
];

export default defineConfig(GigaConfig);

import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';

import { GigaMinterAbi } from './abi/GigaMinter';
import { NftContentAbi } from './abi/NftContent';
import { QOSGigaAbi } from './abi/QOSGiga';

const GigaConfig = [
  {
    out: 'apps/giga/app/hooks/useContract/gigaMinter.ts',
    contracts: [
      {
        name: 'GigaProject',
        abi: GigaMinterAbi,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'apps/giga/app/hooks/useContract/nftContent.ts',
    contracts: [
      {
        name: 'GigaProject',
        abi: NftContentAbi,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'apps/giga/app/hooks/useContract/qosGiga.ts',
    contracts: [
      {
        name: 'GigaProject',
        abi: QOSGigaAbi,
      },
    ],
    plugins: [react()],
  },
];

export default defineConfig(GigaConfig);

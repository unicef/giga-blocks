'use client';

import { Content, Theme } from '@carbon/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { WagmiProvider } from 'wagmi';
import Navbar from '../components/Navbar/Navbar';
import { config } from '../wagmi.config';
import QueryProvider from './libs/get-query-client';

export function Providers({ children }) {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryProvider>
        <WagmiProvider config={config}>
          <ConnectKitProvider>
            <Theme theme="g100">
              <Navbar />
            </Theme>
          </ConnectKitProvider>
          <Content>{children}</Content>
        </WagmiProvider>
      </QueryProvider>
    </div>
  );
}

'use client';

import { Content, Theme } from '@carbon/react';
import { WagmiProvider } from 'wagmi';
import { config } from '../wagmi.config';
import Navbar from '../components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';

export function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <Theme theme="g100">
              <Navbar />
            </Theme>
          </ConnectKitProvider>
          <Content>{children}</Content>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

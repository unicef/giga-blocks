'use client';

import { Content, Theme } from '@carbon/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, useIsMounted } from 'connectkit';
import { WagmiProvider } from 'wagmi';
import Navbar from '../components/Navbar/Navbar';
import config from '../wagmi.config';
import QueryProvider from './libs/get-query-client';
import GarphQlProvider from './libs/graphql-query-client';
import Footer from '../components/footer/Footer';

export function Providers({ children }) {
  const queryClient = new QueryClient();
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <div>
      <QueryProvider>
        <GarphQlProvider>
          <WagmiProvider config={config}>
            <ConnectKitProvider>
              <Theme theme="g100">
                <Navbar />
              </Theme>
              <Content>{children}</Content>
              <Footer />
            </ConnectKitProvider>
          </WagmiProvider>
        </GarphQlProvider>
      </QueryProvider>
    </div>
  );
}

import './globals.scss';
import QueryProvider from './libs/get-query-client';

import { QueryClient } from '@tanstack/react-query';
import { Providers } from './providers';

const queryClient = new QueryClient();

export const metadata = {
  title: 'Carbon + Next13',
  description: 'IBM Carbon Tutorial with NextJS 13',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <QueryProvider>{children}</QueryProvider>
        </Providers>
      </body>
    </html>
  );
}

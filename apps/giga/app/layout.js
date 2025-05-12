import './globals.scss';

import { Providers } from './providers';

export const metadata = {
  title: 'Giga Blocks',
  description:
    'Building the World’s Largest Decentralized School Database - Together',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

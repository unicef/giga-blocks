import './globals.scss';
import { Lora } from 'next/font/google';
import QueryProvider from './libs/get-query-client';

const lora = Lora({ subsets: ['latin'] });

export const metadata = {
  title: 'NFT 2.0',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

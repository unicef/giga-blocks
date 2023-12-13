import './globals.scss';
import { Lora } from 'next/font/google';
import { Open_Sans } from 'next/font/google';
import { AuthProvider } from "./auth/JwtContext";
import QueryProvider from './libs/get-query-client';
import Web3Provider from './components/web3/Provider';

const lora = Lora({ subsets: ['latin'] });
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'NFT 2.0',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <Web3Provider>
      <AuthProvider>
      <body className={openSans.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
      </AuthProvider>
      </Web3Provider>
    </html>
  );
}

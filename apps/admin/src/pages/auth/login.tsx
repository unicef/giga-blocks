// next
import Head from 'next/head';

// sections
import { LoginComp } from '@sections/auth';
import { LoginProvider } from '../../contexts/auth';
// auth

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
      <LoginProvider>
        <Head>
          <title>Giga school | NFT 2.0</title>
        </Head>

        <LoginComp />
      </LoginProvider>
  );
}
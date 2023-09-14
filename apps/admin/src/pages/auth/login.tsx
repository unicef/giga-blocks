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
          <title>LSO Partner - D3 Visualization Product</title>
        </Head>

        <LoginComp />
      </LoginProvider>
  );
}
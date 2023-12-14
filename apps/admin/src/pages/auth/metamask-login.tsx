// next
import Head from 'next/head';

// sections
import { MetamaskLoginComp } from '@sections/auth';
import { LoginProvider } from '../../contexts/auth';

// ----------------------------------------------------------------------

export default function EmailLogin() {
  return (
    <LoginProvider>
      <Head>
        <title> Metamask login | Giga Admin</title>
      </Head>

      <MetamaskLoginComp />
    </LoginProvider>
  );
}

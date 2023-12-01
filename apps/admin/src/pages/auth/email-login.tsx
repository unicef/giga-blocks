// next
import Head from 'next/head';

// sections
import { EmailLoginComp } from '@sections/auth';
import { LoginProvider } from '../../contexts/auth';

// ----------------------------------------------------------------------

export default function EmailLogin() {
  return (
    <LoginProvider>
      <Head>
        <title> Email login | Giga Admin</title>
      </Head>

      <EmailLoginComp />
    </LoginProvider>
  );
}

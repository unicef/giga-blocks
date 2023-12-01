// next
import Head from 'next/head';

// sections
import { VerifyComp } from '@sections/auth';
import { APP_NAME } from '../../config-global';
import { LoginProvider } from '../../contexts/auth';
// auth
import GuestGuard from '../../auth/GuestGuard';

// ----------------------------------------------------------------------

export default function VerifyCode() {
  return (
    <GuestGuard>
      <LoginProvider>
        <Head>
          <title> Verify code | {APP_NAME}</title>
        </Head>

        <VerifyComp />
      </LoginProvider>
    </GuestGuard>
  );
}

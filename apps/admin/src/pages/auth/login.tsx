import Head from 'next/head';
import { LoginComp } from '@sections/auth';
import { LoginProvider } from '../../contexts/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import { useAuthContext } from 'src/auth/useAuthContext';
import EmailLogin from './email-login';
import { NextRouter } from 'next/router';

export default function LoginPage() {
  const { push } = useRouter() as NextRouter as NextRouter;
  const { isAuthenticated } = useAuthContext();
  useEffect(() => {
    if (isAuthenticated) {
      push('/dashboard');
    }
  }, [isAuthenticated]);
  return (
    <LoginProvider>
      <Head>
        <title>Giga Blocks</title>
      </Head>

      <EmailLogin />
    </LoginProvider>
  );
}

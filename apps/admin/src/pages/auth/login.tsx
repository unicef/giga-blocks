import Head from 'next/head';
import { LoginComp } from '@sections/auth';
import { LoginProvider } from '../../contexts/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';

export default function LoginPage() {
  const {push} = useRouter()
  const { isAuthenticated } = useAuthContext();
  useEffect(() => {
    if (isAuthenticated) {
      push('/dashboard');
    }
  }, [isAuthenticated])
  return (
      <LoginProvider>
        <Head>
          <title>Giga Blocks</title>
        </Head>

        <LoginComp />
      </LoginProvider>
  );
}
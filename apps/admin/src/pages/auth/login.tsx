// next
import Head from 'next/head';

// sections
import { LoginComp } from '@sections/auth';
import { LoginProvider } from '../../contexts/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';
// auth

// ----------------------------------------------------------------------

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
          <title>Giga school | NFT 2.0</title>
        </Head>

        <LoginComp />
      </LoginProvider>
  );
}
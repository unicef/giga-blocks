import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from './useAuthContext';
import LoadingScreen from '../components/loading-screen';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      return; // Wait for initialization to complete
    }

    if (!isAuthenticated && pathname !== '/auth/login') {
      push('/auth/login');
    }
  }, [isAuthenticated, pathname, push, isInitialized]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return;
  }

  return <>{children}</>;
}

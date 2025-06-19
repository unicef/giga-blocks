import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import { useAuthContext } from './useAuthContext';
import LoadingScreen from '../components/loading-screen';
import { NextRouter } from 'next/router';

interface AuthGuardProps {
  children: ReactNode;
}
// const basePath = process.env.NEXT_PUBLIC_ADMIN_BASE_PATH

export default function AuthGuard({ children }: AuthGuardProps) {
  //@ts-ignore
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  const { pathname, push } = useRouter() as NextRouter as NextRouter;

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated && pathname !== `/auth/login`) {
      push(`/auth/login`);
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

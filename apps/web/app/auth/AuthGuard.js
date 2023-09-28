import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from './useAuthContext';
import LoadingScreen from '../components/loading-screen';

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    // if (!isAuthenticated && pathname !== '/auth/login') {
    //   push('/auth/login');
    // }
  }, [isAuthenticated, pathname, push, isInitialized]);

  if (!isInitialized) {
    // return <LoadingScreen />;
    return "Loading...."
  }

  // if (!isAuthenticated) {
  //   return <Login />;
  // }

  return <>{children}</>;
}

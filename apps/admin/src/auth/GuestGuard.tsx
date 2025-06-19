import { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import LoadingScreen from '../components/loading-screen';
import { useAuthContext } from './useAuthContext';
import { NextRouter } from 'next/router';

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { push } = useRouter() as NextRouter as NextRouter;
  const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      push('/dashboard');
    }
  }, [isAuthenticated, push]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

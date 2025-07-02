import { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import { NextRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter() as NextRouter as NextRouter;

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/dashboard');
    }
  });

  return null;
}

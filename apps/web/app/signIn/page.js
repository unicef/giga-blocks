import { Suspense } from 'react';
import WalletLoginClient from './signInClient';

const WalletLogin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WalletLoginClient />
    </Suspense>
  );
};

export default WalletLogin;

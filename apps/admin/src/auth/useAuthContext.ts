import { useContext } from 'react';
//
import { AppAuthContext } from './JwtContext';

export const useAuthContext = () => {
  const context = useContext(AppAuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};

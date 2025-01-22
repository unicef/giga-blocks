import {
  NONCE,
  WALLETREGISTER,
  WALLETLOGIN,
} from '../../constants/api';
import { useMutation } from '@tanstack/react-query';
import {apiGuest} from '../../utils/api'

export const useGetNonce = () => {
  return useMutation(['nonce'], async () => {
    const response = await apiGuest.get(NONCE.GETNONCE);
    return response.data;
  });
};

export const walletRegister = () => {
  const walletRegisterMutation = useMutation(async (payload) => {
    const register = await apiGuest.post(WALLETREGISTER.WALLETREGISTER, payload);
    return register;
  });
  return walletRegisterMutation;
};

export const useWalletLogin = () => {
  const walletLoginMutation = useMutation(async (payload) => {
      const register = await apiGuest.post(WALLETLOGIN.WALLETLOGIN, payload);
      return register;
  },{
    onError: (error) => {
      
    },
  });
  return walletLoginMutation;
};

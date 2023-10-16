import {
  BASE_URL,
  NONCE,
  WALLETREGISTER,
  WALLETLOGIN,
} from '../../constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
});

export const useGetNonce = () => {
  return useMutation(['nonce'], async () => {
    const response = await api.get(NONCE.GETNONCE);
    return response.data;
  });
};

export const walletRegister = () => {
  const walletRegisterMutation = useMutation(async (payload) => {
    const register = await api.post(WALLETREGISTER.WALLETREGISTER, payload);
    return register;
  });
  return walletRegisterMutation;
};
export const walletLogin = () => {
  const walletLoginMutation = useMutation(async (payload) => {
    const register = await api.post(WALLETLOGIN.WALLETLOGIN, payload);
    return register;
  });
  return walletLoginMutation;
};

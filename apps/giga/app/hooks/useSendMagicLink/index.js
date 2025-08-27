import { useMutation } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { ENDPOINTS } from '../../constants/api';

export const useSendMagicLink = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(ENDPOINTS.MAGICLINK.SEND, payload);
      return data;
    },
  });
};

export const useVerifyMagicLink = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(ENDPOINTS.MAGICLINK.VERIFY, payload);
      return data;
    },
  });
};

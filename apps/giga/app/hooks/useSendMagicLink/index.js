import { useMutation } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { MAGICLINK } from '../../constants/api';

export const useSendMagicLink = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(MAGICLINK.SEND, payload);
      return data;
    },
  });
};

export const useVerifyMagicLink = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(MAGICLINK.VERIFY, payload);
      return data;
    },
  });
};

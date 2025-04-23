import { useMutation } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { MAGICLINK } from '../../constants/api';

export const useActivateSchool = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(MAGICLINK.SEND, payload);
      return data;
    },
  });
};

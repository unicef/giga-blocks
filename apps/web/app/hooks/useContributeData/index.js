import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '../../constants/api';
import { api } from '../../utils/api';

export const useContributeData = () => {
  const contributeDataMutation = useMutation(async (payload) => {
    const post = await api.post(ENDPOINTS.CONTRIBUTE.POST, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return post;
  });
  return contributeDataMutation;
};

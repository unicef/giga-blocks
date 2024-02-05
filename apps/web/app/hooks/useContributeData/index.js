import { useMutation } from '@tanstack/react-query';
import {  CONTRIBUTE } from '../../constants/api';
import {api} from '../../utils/api'

export const useContributeData = () => {
  const contributeDataMutation = useMutation(async (payload) => {
    const post = await api.post(CONTRIBUTE.POST, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return post;
  });
  return contributeDataMutation;
};

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, CONTRIBUTE } from '../../constants/api';
import { getAccessToken } from '../../utils/sessionManager';

const api = axios.create({
  baseURL: BASE_URL,
});
const accessToken = getAccessToken();
api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

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

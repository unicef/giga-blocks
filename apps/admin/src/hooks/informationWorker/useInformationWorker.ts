'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import routes from '../../constants/api';
import api from '@utils/apiCall';

export const useGetInformationWorker = () => {
  return useQuery(['get-information-worker'], async () => {
    const { data } = await api.get(`${routes.INFORMATION_WORKER.GET}`);
    return data;
  });
};

const postInformationWorker = async (data: any) => {
  return await api.post(routes.INFORMATION_WORKER.POST, data);
};

export const usePostInformationWorker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postInformationWorker,
    onSuccess: () => queryClient.invalidateQueries(['get-information-worker']),
  });
};

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async () => {
      return await api.post(routes.INFORMATION_WORKER.SEND_EMAIL);
    },
  });
};

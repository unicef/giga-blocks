'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import routes from '../../constants/api';
import api from '@utils/apiCall';
import { useSnackbar } from '@components/snackbar';

export const useGetInformationWorker = ({ page, perPage }: { page?: number; perPage: number }) => {
  return useQuery(['get-information-worker'], async () => {
    const { data } = await api.get(
      `${routes.INFORMATION_WORKER.GET}?page=${page}&perPage=${perPage}`
    );

    let emailSentFalseCount = 0;
    if (Array.isArray(data.rows)) {
      data.rows.forEach((item: any) => {
        if (item.emailSent === false) {
          emailSentFalseCount++;
        }
      });
    }
    return {
      informationWorker: data,
      emailSentFalseCount,
    };
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
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async () => {
      return await api.post(routes.INFORMATION_WORKER.SEND_EMAIL);
    },
    onSuccess: () => {
      queryClient.refetchQueries(['get-information-worker']);
      enqueueSnackbar('Email send process successfully started', {
        variant: 'success',
      });
    },
    onError: () => {
      queryClient.refetchQueries(['get-information-worker']);

      enqueueSnackbar('Issue while sending email', {
        variant: 'error',
      });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@utils/apiCall';
import { useSnackbar } from 'notistack';

export const fetchJobs = async (endpoint: string) => {
  const { data } = await api.get(`/queue/${endpoint}/jobs`);

  return data;
};
export const fetchFailedJobs = async (endpoint: string) => {
  const { data } = await api.get(`/queue/${endpoint}/failed`);

  return data;
};

export const retryJob = async (endpoint: string, jobId: number | string) => {
  const { data } = await api.post(`/queue/${endpoint}/retry/${jobId}`);
  return data;
};
export const useQueueJobsQuery = (queueType: string) => {
  return useQuery({
    queryKey: ['jobs', queueType],
    queryFn: () => fetchJobs(queueType),
    refetchInterval(query) {
      return 4000;
    },
  });
};
export const useQueueFailedJobsQuery = (queueType: string) => {
  return useQuery({
    queryKey: ['jobs', queueType],
    queryFn: () => fetchFailedJobs(queueType),
    refetchInterval(query) {
      return 4000;
    },
  });
};

export const useRetryJobMutation = (queueType: string) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (jobId: number | string) => retryJob(queueType, jobId),
    onError(error, variables, context) {
      console.log('error', error);

      enqueueSnackbar((error as any)?.response?.data?.message || 'An error occurred', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs', queueType] });
      enqueueSnackbar('Job retried successfully', {
        variant: 'success',
      });
    },
  });
};

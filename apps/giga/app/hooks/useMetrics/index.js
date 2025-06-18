import { METRICS } from '../../constants/api';
import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';


export const useMetrics = () => {
    return useQuery({
        queryKey: [METRICS.GET],
        queryFn: async () => {
        const { data } = await apiGuest.get(METRICS.GET);
        return data;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    }
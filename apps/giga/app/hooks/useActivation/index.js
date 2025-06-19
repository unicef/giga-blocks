'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { ENDPOINTS } from '../../constants/api';

export const useGetActiveSchool = (id) => {
  return useQuery(
    ['get-activate-status', id],
    async () => {
      const { data } = await apiGuest.get(
        `${ENDPOINTS.LINKACTIVATION.GET}/${id}`
      );
      return data;
    },
    { retry: false }
  );
};

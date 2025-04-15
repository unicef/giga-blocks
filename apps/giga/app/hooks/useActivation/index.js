'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { LINKACTIVATION } from '../../constants/api';

export const useGetActiveSchool = (id) => {
  return useQuery(['get-activate-status', id], async () => {
    const { data } = await apiGuest.get(`${LINKACTIVATION.GET}/${id}`);
    return data;
  });
};

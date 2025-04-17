'use client';
import { SCHOOLS } from '../../constants/api';
import { useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';

export const useSchoolGet = (page, perPage, name) => {
  return useQuery(
    ['get-school-list', page, perPage, name],
    async () => {
      const { data } = await apiGuest.get(
        `${SCHOOLS.GET}?page=${page}&perPage=${perPage}&name=${name}`
      );

      return data;
    },
    {
      enabled: !!page && !!perPage, // Only run if both are valid
      keepPreviousData: false,
      cacheTime: 0,
    }
  );
};

export const useSchoolDetails = (id) => {
  return useQuery(['get-school-details', id], async () => {
    const { data } = await apiGuest.get(`${SCHOOLS.GET}/${id}`);
    return data;
  });
};

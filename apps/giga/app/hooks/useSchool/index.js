'use client';
import { SCHOOLS } from '../../constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';

export const useSchoolGet = (page, perPage, name, country, minted) => {
  return useQuery(
    ['get-school-list', page, perPage, name, country, minted],
    async () => {
      const { data } = await apiGuest.get(
        `${SCHOOLS.GET}?page=${page}&perPage=${perPage}&name=${name}&country=${country}&minted=${minted}`
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

export const useSchoolActivate = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(SCHOOLS.ACTIVATE, payload);
      return data;
    },
  });
};

export const useClaimSchool = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(SCHOOLS.CLAIM, payload);
      return data;
    },
  });
};
export const useSchoolPaidActivation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(SCHOOLS.PAIDACTIVATION, payload);
      return data;
    },
  });
};

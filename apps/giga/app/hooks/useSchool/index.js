'use client';
import { SCHOOLS, FEATURED } from '../../constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';

export const useSchoolGet = (
  page,
  perPage,
  name,
  country,
  minted,
  filters = {}
) => {
  return useQuery(
    ['get-school-list', page, perPage, name, country, minted, filters],
    async () => {
      const params = new URLSearchParams({
        page,
        perPage,
        name,
        country,
        minted,
        ...filters,
      });

      const { data } = await apiGuest.get(
        `${SCHOOLS.GET}?${params.toString()}`
      );
      return data;
    },
    {
      enabled: !!page && !!perPage,
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
export const useFeaturedSchool = () => {
  return useQuery(['get-featured-schools'], async () => {
    const { data } = await apiGuest.get(`${FEATURED.GET}`);
    return data;
  });
};

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
  water,
  electricity,
  connectivityStatus,
  connectionType,
  students,
  teachers,
  computers,
  download,
  enabled = true
) => {
  return useQuery(
    [
      'get-school-list',
      page,
      perPage,
      name,
      country,
      minted,
      water,
      electricity,
      connectivityStatus,
      connectionType,
      students,
      teachers,
      computers,
      download,
    ],
    async () => {
      const params = new URLSearchParams();

      if (page) params.set('page', page);
      if (perPage) params.set('perPage', perPage);
      if (name) params.set('name', name);
      if (country) params.set('country', country);
      if (minted) params.set('minted', minted);

      if (water && water !== 'all') params.set('water', water);
      if (electricity && electricity !== 'all')
        params.set('electricity', electricity);
      if (connectivityStatus && connectivityStatus !== 'all')
        params.set('connectivityStatus', connectivityStatus);
      if (connectionType && connectionType !== 'all')
        params.set('connectionType', connectionType);

      if (students && students > 0) params.set('students', students);
      if (teachers && teachers > 0) params.set('teachers', teachers);
      if (computers && computers > 0) params.set('computers', computers);
      if (download && download > 0) params.set('download', download);

      const { data } = await apiGuest.get(
        `${SCHOOLS.GET}?${params.toString()}`
      );
      return data;
    },
    {
      enabled: enabled && !!page && !!perPage,
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

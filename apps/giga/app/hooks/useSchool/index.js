'use client';
import { ENDPOINTS } from '../../constants/api';
import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import countryList from '../../data/country.json';

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
  return useQuery(
    ['get-school-details', id],
    async () => {
      const { data } = await apiGuest.get(`${ENDPOINTS.SCHOOLS.GET}/${id}`);
      return data;
    },

    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      // refetchOnMount: false,
      retry: 1,
    }
  );
};

export const useSchoolActivate = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(ENDPOINTS.SCHOOLS.ACTIVATE, payload);
      return data;
    },
  });
};

export const useClaimSchool = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(ENDPOINTS.SCHOOLS.CLAIM, payload);
      return data;
    },
  });
};
export const useSchoolPaidActivation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiGuest.post(
        ENDPOINTS.SCHOOLS.PAIDACTIVATION,
        payload
      );
      return data;
    },
  });
};
export const useFeaturedSchool = () => {
  return useQuery(['get-featured-schools'], async () => {
    const { data } = await apiGuest.get(`${ENDPOINTS.FEATURED.GET}`);
    return data;
  });
};

export const useSchoolInfiniteGet = (
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
  return useInfiniteQuery(
    [
      'get-school-list-infinite',
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
    async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();

      params.set('page', pageParam);
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

      const res = await apiGuest.get(
        `${ENDPOINTS.SCHOOLS.GET}?${params.toString()}`
      );

      const data = res?.data || [];

      // Map country codes to country names
      const mappedData = data?.rows.map((school) => {
        const found = countryList.find((c) => c.code === school?.country);
        return {
          ...school,
          countryName: found ? found.country : school.country,
        };
      });

      return { ...data, rows: mappedData };
    },
    {
      enabled: enabled && !!perPage,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.meta?.currentPage < lastPage?.meta?.lastPage) {
          const nextPage = lastPage.meta.currentPage + 1;
          const alreadyLoaded = allPages.some(
            (page) => page.meta.currentPage === nextPage
          );
          return alreadyLoaded ? undefined : nextPage;
        }
        return undefined;
      },
      keepPreviousData: false,
      cacheTime: 0,
      staleTime: 60 * 1000, // 1 minute
    }
  );
};

export const useCountryList = () => {
  return useQuery(
    ['country-list'],
    async () => {
      const res = await apiGuest.get(`${ENDPOINTS.SCHOOLS.COUNTRIES}`);
      const mapped = res.data.map((data) => {
        const found = countryList.find((c) => c.code === data?.country_code);
        return found
          ? { code: found.code, country: found.country }
          : { code, country: code };
      });
      const sorted = mapped.sort((a, b) =>
        a.country.localeCompare(b.country)
      );

      return sorted;
    },
    {
      keepPreviousData: true,
    }
  );
};

'use client';
import routes from '../../constants/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@utils/apiCall';

export const useSchoolGet = ({
  page,
  perPage,
  minted,
  uploadId,
  name,
  country,
  connectivity,
  school,
  order,
  orderBy,
  debouncedValue,
}: {
  page?: number;
  perPage: number;
  minted?: string;
  uploadId?: any;
  name?: string;
  country?: string;
  connectivity?: string;
  school?: string;
  order?: string;
  orderBy?: string;
  debouncedValue?: any;
}) => {
  return useQuery(
    ['get-school-data', page, perPage, debouncedValue],
    async () => {
      const { data } = await api.get(
        `${routes.SCHOOLS.GET}?perPage=${perPage}${page ? `&page=${page}` : ''}${
          name ? `&name=${name}` : ''
        }${minted ? `&minted=${minted}` : ''}${uploadId ? `&uploadId=${uploadId}` : ``}${
          country ? `&country=${country}` : ``
        }${connectivity ? `&connectivityStatus=${connectivity}` : ``}${
          school && school.length > 1 ? `&name=${school}` : ``
        }${order ? `&order=${order}` : ``}${orderBy ? `&orderBy=${orderBy}` : ``}`
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useAllSchool = () => {
  return useQuery(['get-all-school'], async () => {
    const { data } = await api.get(`${routes.SCHOOLS.GET}`);
    return data;
  });
};

export const useSchoolGetById = (id: string | undefined | string[]) => {
  return useQuery(
    ['get-single-school'],
    async () => {
      const { data } = await api.get(`${routes.SCHOOLS.GET}/${id}`);
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useSchoolCount = (minted?: string) => {
  return useQuery(
    ['get-school-count'],
    async () => {
      const { data } = await api.get(`${routes.SCHOOLS.SCHOOLCOUNT}`);
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useActivateSchool = () => {
  return useQuery(['get-active-school'], async () => {
    const { data } = await api.get(`${routes.LINK_ACTIVATION.GET}`);
    return data;
  });
};

export const useMintedSchoolCount = (minted?: string) => {
  return useQuery(
    ['minted-school-count'],
    async () => {
      const { data } = await api.get(`${routes.SCHOOLS.SCHOOLCOUNT}?${`minted=${minted}`}`);
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

const activatePostSchool = async (data: any) => {
  return await api.post(routes.LINK_ACTIVATION.POST, data);
};

export const useActivatePostSchools = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activatePostSchool,
    // REFETCH SCHOOL DATA ON SUCCESSFUL FORM SUBMISSION
    onSuccess: () => {
      queryClient.invalidateQueries(['get-active-school']);
    },
  });
};

const activatePatchSchool = async (data: any) => {
  return await api.patch(`${routes.LINK_ACTIVATION.ACTIVATE}/${data.id}`, data);
};
export const useActivatePatchSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activatePatchSchool,
    onSuccess: () => {
      queryClient.invalidateQueries(['get-active-school']);
    },
  });
};

const deactivatePatchSchool = async (data: any) => {
  return await api.patch(`${routes.LINK_ACTIVATION.DEACTIVATE}/${data.id}`, data);
};

export const useDeactivatePatchSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivatePatchSchool,
    onSuccess: () => {
      queryClient.invalidateQueries(['get-active-school']);
    },
  });
};

const mintSchool = async (data: any) => {
  return await api.post(routes.SCHOOLS.MINT, data);
};

export const useMintSchools = () => {
  return useMutation(mintSchool);
};

const mintBulkSchool = async (data: any) => {
  return await api.post(routes.SCHOOLS.MINTBULK, data);
};

export const useBulkMintSchools = () => {
  return useMutation(mintBulkSchool);
};

export const useSchoolGetByGigaSchoolId = (id: string | undefined | string[]) => {
  return useQuery(
    ['get-single-school'],
    async () => {
      const { data } = await api.get(`${routes.SCHOOLS.GIGAID}/${id}`);
      return { id: data?.id, imageHash: data?.imageHash };
    },
    {
      keepPreviousData: true,
      enabled: !!id,
    }
  );
};

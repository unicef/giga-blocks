'use client';
import routes from '../../constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@utils/apiCall';

export const useSchoolGet = ({page, perPage, minted, uploadId, name, country, connectivity, school, order, orderBy}:{page?: number, perPage: number, minted?: string, uploadId?: any, name?: string, country?:string, connectivity?:string, school?:string, order?:string, orderBy?:string}) => {
  return useQuery(
    ['get-school-data', page, perPage],
    async () => {
      const { data } = await api.get(
        `${routes.SCHOOLS.GET}?perPage=${perPage}${page ? `&page=${page}` : ''}${name ? `&name=${name}` : ''}${minted ? `&minted=${minted}` : ''}${uploadId ? `&uploadId=${uploadId}` : ``}${country ? `&country=${country}` : ``}${connectivity ? `&connectivityStatus=${connectivity}` : ``}${school && school.length > 1 ? `&name=${school}` : ``}${order ? `&order=${order}` : ``}${orderBy ? `&orderBy=${orderBy}` : ``}`
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useAllSchool = () =>{
  return useQuery(
    ['get-all-school'],
    async () =>{
      const {data} = await api.get(
        `${routes.SCHOOLS.GET}`
      );
      return data;
    }
  )
  
}


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

const mintSchool = async (data: any) => {
  return await api.post(routes.SCHOOLS.MINT, data);
};

const mintBulkSchool = async (data: any) => {
  return await api.post(routes.SCHOOLS.MINTBULK, data);
};

export const useMintSchools = () => {
  return useMutation(mintSchool);
};

export const useBulkMintSchools = () => {
  return useMutation(mintBulkSchool);
};

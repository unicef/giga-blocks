'use client';
import routes from '../../constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getAccessToken } from '@utils/sessionManager';

const api = axios.create({
  baseURL: routes.BASE_URL,
});

const accessToken = getAccessToken();

api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const useSchoolGet = ({page, perPage, minted, uploadId, name, country, connectivity, school}:{page?: number, perPage: number, minted?: string, uploadId?: any, name?: string, country?:string, connectivity?:string, school?:string}) => {
  return useQuery(
    ['get-api-data', page, perPage],
    async () => {
      const { data } = await api.get(
        `${routes.SCHOOLS.GET}?perPage=${perPage}${page ? `&page=${page}` : ''}${name ? `&name=${name}` : ''}${minted ? `&minted=${minted}` : ''}${uploadId ? `&uploadId=${uploadId}` : ``}${country ? `&country=${country}` : ``}${connectivity ? `&connectivityStatus=${connectivity}` : ``}${school ? `&name=${school}` : ``}`
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
    ['single-school'],
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
    ['school-count'],
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
    ['mint-school-count'],
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

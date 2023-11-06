import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import routes from '../../constants/api';
import { getAccessToken } from '@utils/sessionManager';

const api = axios.create({
    baseURL: routes.BASE_URL,
  });
  
  const accessToken = getAccessToken();
  
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const useContributeGet = (page:number, perPage:number) => {
    return useQuery(
      ['get-api-data',page,perPage],
      async () => {
        const { data } = await api.get(
          `${routes.CONTRIBUTE.GET}?page=${page}&perPage=${perPage}`
        );
        return data;
      },
      {
        keepPreviousData: true,
      }
    );
  };

  export const useContributionGetById = (id: string | undefined | string[]) => {
    return useQuery(
      ['single-contribution'],
      async () => {
        const { data } = await api.get(`${routes.CONTRIBUTE.GET}/${id}`);
        return data;
      },
      {
        keepPreviousData: true,
      }
    );
  };
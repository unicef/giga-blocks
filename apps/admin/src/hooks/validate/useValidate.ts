import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import routes from '../../constants/api';
import { getAccessToken } from '@utils/sessionManager';

const api = axios.create({
    baseURL: routes.BASE_URL,
  });
  
  const accessToken = getAccessToken();
  
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const useValidateGet = (page:number, perPage:number) => {
    return useQuery(
      ['get-api-data',page,perPage],
      async () => {
        const { data } = await api.get(
          `${routes.VALIDATE.GET}?page=${page}&perPage=${perPage}`
        );
        return data;
      },
      {
        keepPreviousData: true,
      }
    );
  };

  export const useValidDataGetById = (id: string | undefined | string[]) => {
    return useQuery(
      ['single-contribution'],
      async () => {
        const { data } = await api.get(`${routes.VALIDATE.GET}/${id}`);
        return data;
      },
      {
        keepPreviousData: true,
      }
    );
  };

  const validateData = async (id: string | undefined | string[]) => {
    return await api.patch(`${routes.VALIDATE.PATCH}/${id}`);
  };

  export const useValidateUpdate = () => {
    return useMutation(validateData);
  };
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import routes from '../../constants/api';
import { getAccessToken } from '@utils/sessionManager';

const api = axios.create({
  baseURL: routes.BASE_URL,
});

const accessToken = getAccessToken();

api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const useValidateGet = (page: number, perPage: number, status?: string, validation?: boolean, school?:string) => {
  return useQuery(
    ['get-validate-data', page, perPage, status, validation],
    async () => {
      const { data } = await api.get(
        `${routes.VALIDATE.GET}?page=${page}&perPage=${perPage}&status=${status}${school ? `&school=${school}` : ``}`
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
    ['validation-details'],
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

const validateBulkData = async (ids: string[]) => {
  return await api.patch(`${routes.VALIDATE.PATCHBULK}`, { id: ids });
};

export const useValidateBulkUpdate = () => {
  return useMutation(validateBulkData);
};
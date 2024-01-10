import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import routes from '../../constants/api';
import { getAccessToken } from '@utils/sessionManager';

const api = axios.create({
    baseURL: routes.BASE_URL,
  });
  
  const accessToken = getAccessToken();
  
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const useContributeGet = ({page, perPage, schoolId, contributeId, status}:{page:number, perPage:number, schoolId?:string, contributeId?:string, status?:string}) => {
    return useQuery(
      ['get-contributor-data',page,perPage],
      async () => {
        const { data } = await api.get(
          `${routes.CONTRIBUTE.GET}?page=${page}&perPage=${perPage}${schoolId ? `&schoolId=${schoolId}` : ``}${contributeId ? `&contributorId=${contributeId}` : ``}${status?`&status=${status}`:''}`
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
      ['contribution-details-by-id'],
      async () => {
        const { data } = await api.get(`${routes.CONTRIBUTE.GET}/${id}`);
        return data;
      },
      {
        keepPreviousData: true,
      }
    );
  };

  const validateData = async (data: any) => {
    return await api.patch(routes.CONTRIBUTE.PATCH, data);
  };

  export const useContributionValidate = () => {
    return useMutation(validateData);
  };
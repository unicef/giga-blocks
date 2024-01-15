import { useQuery, useMutation } from "@tanstack/react-query";
import routes from '../../constants/api';
import api from "@utils/apiCall";

export const useContributeGet = ({page, perPage, schoolId, contributeId, status, order, orderBy}:{page:number, perPage:number, schoolId?:string, contributeId?:string, status?:string, order?:string, orderBy?:string}) => {
    return useQuery(
      ['get-contributor-data',page,perPage],
      async () => {
        const { data } = await api.get(
          `${routes.CONTRIBUTE.GET}?page=${page}&perPage=${perPage}${schoolId ? `&schoolId=${schoolId}` : ``}${contributeId ? `&contributorId=${contributeId}` : ``}${status?`&status=${status}`:''}${order?`&order=${order}`:''}${orderBy?`&orderBy=${orderBy}`:''}`
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
"use client";
import  routes  from "../../constants/api";
import { useQuery } from "@tanstack/react-query";
import api from "@utils/apiCall";

export const useUserGet = (page:number, perPage:number, role?:string, debouncedName?:string, order?:string, orderBy?:string, name?: string) => {
  return useQuery(
    ["get-user-data", page, perPage, debouncedName], 
    async () => {
      const { data } = await api.get(
        `${routes.USER.GET}${page ?`?page=${page}`:''}${perPage ?`?perPage=${perPage}`:''}${role ? `&role=${role}`:''}${debouncedName ? `&name=${debouncedName}` : ''}${order ? `&order=${order}` : ''}${orderBy ? `&orderBy=${orderBy}` : ''}`
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useUserGetById = (id:string | undefined | string[]) => {
  return useQuery(['get-single-user'], async () => {
    const {data} = await api.get(`${routes.USER.GET}/${id}`)
    return data
  }
  ,
    {
      keepPreviousData: true,
    }
  )
}

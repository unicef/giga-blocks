"use client";
import  routes  from "../../constants/api";
import { useQuery } from "@tanstack/react-query";
import api from "@utils/apiCall";

export const useUserGet = (page:number, perPage:number, role?:string, debouncedName?:string, order?:string, orderBy?:string, name?: string) => {
  return useQuery(
    ["get-user-data", page, perPage, debouncedName],
    async () => {
      let query = '';
      if (page) {
        query = `?page=${page}&perPage=${perPage}`;
      } else {
        query = `?perPage=${perPage}`;
      }
      if (role) query += `&role=${role}`;
      if (debouncedName) query += `&name=${debouncedName}`;
      if (order) query += `&order=${order}`;
      if (orderBy) query += `&orderBy=${orderBy}`;

      const { data } = await api.get(`${routes.USER.GET}${query}`);
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

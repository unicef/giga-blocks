"use client";
import  routes  from "../../constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL:routes.BASE_URL,
});

export const useSchoolGet = (page:number, perPage:number) => {
  return useQuery(
    ["get-api-data", page, perPage],
    async () => {
      const { data } = await api.get(
        `${routes.SCHOOLS.GET}?page=${page}&perPage=${perPage}`
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useSchoolGetById = (id:string | undefined | string[]) => {
  return useQuery(['single-school'], async () => {
    const {data} = await api.get(`${routes.SCHOOLS.GET}/${id}`)
    return data
  }
  ,
    {
      keepPreviousData: true,
    }
  )
}

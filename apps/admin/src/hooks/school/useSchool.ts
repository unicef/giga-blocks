"use client";
import  routes  from "../../constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "@utils/sessionManager";

const api = axios.create({
  baseURL:routes.BASE_URL,
});

const accessToken = getAccessToken()

api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

export const useSchoolGet = (page:number, perPage:number, minted?:string) => {
  return useQuery(
    ["get-api-data", page, perPage],
    async () => {
      const { data } = await api.get(
        `${routes.SCHOOLS.GET}?page=${page}&perPage=${perPage}${minted && `&minted=${minted}`}`
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

export const useSchoolCount = () => {
  return useQuery(['school-count'], async () => {
    const {data} = await api.get(`${routes.SCHOOLS.SCHOOLCOUNT}`)
    return data
  }
  ,
    {
      keepPreviousData: true,
    }
  )
}

const mintSchool = async(data:any) => {
  return await api.post(routes.SCHOOLS.MINT, data)
}

const mintBulkSchool = async(data:any) => {
  return await api.post(routes.SCHOOLS.MINTBULK, data)
}

export const useMintSchools = () => {
  return useMutation(mintSchool)
}

export const useBulkMintSchools = () => {
  return useMutation(mintBulkSchool)
}

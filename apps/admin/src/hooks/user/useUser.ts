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

export const useUserGet = (page:number, perPage:number) => {
  return useQuery(
    ["get-api-data", page, perPage],
    async () => {
      const { data } = await api.get(
        `${routes.USER.GET}`
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useUserGetById = (id:string | undefined | string[]) => {
  return useQuery(['single-school'], async () => {
    const {data} = await api.get(`${routes.USER.GET}/${id}`)
    return data
  }
  ,
    {
      keepPreviousData: true,
    }
  )
}
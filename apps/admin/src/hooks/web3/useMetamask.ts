"use client";
import  routes  from "../../constants/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@utils/apiCall";

export const useNonceGet = (enabled:boolean) => {
  return useQuery(
    ["get-nonce"],
    async () => {
      const { data } = await api.get(routes.GETNONCE.GET);
      return data;
    },
    {enabled}
  );
};


const loginWallet = async (signatureData:any) => {
    return await api.post(routes.WALLET_LOGIN.POST, signatureData)
}

export const useLoginWallet = () => {
    return useMutation(loginWallet)
}

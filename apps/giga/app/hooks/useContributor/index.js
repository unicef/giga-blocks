'use client';
import { useMutation,useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { CONTRIBUTOR } from '../../constants/api';

export const useContributorPatch = () => {
  return useMutation({
    mutationFn: async ({ walletAddress, isVisible = false, name }) => {
      const payload = {
        isVisible,
        name: name || walletAddress,
      };
      const response = await apiGuest.patch(
        `${CONTRIBUTOR.PATCH}/${walletAddress}`,
        payload
      );
      return response.data;
    },
  });
};

export const useContributorList = () => {
  return useQuery(
    ['get-contributor-list'],
    async () => {
      const response = await apiGuest.get(`${CONTRIBUTOR.LIST}`);
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
}

export const useContributorGet = (walletAddress) => {
  return useQuery(
    ['get-contributor-details',walletAddress],
    async () => {
      const response = await apiGuest.get(`${CONTRIBUTOR.GET}/${walletAddress}`);
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
}
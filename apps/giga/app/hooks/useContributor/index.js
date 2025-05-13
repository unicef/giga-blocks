'use client';
import { useMutation } from '@tanstack/react-query';
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

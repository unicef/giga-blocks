'use client';
import { CONTRIBUTOR } from '../../constants/api';
import { useQuery } from '@tanstack/react-query';
import {apiGuest} from '../../utils/api'

export const useContributionList = () => {
  return useQuery(
    ['get-contribution-list-data'],
    async () => {
      try {
        const res = await apiGuest.get(`${CONTRIBUTOR.GET}`);
        return res.data;
      } catch (err) {
        console.log('Error fetching data:', err);
        throw new Error('Failed to fetch data from the API');
      }
    },
    {
      keepPreviousData: true,
    }
  );
};

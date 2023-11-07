'use client';
import { BASE_URL, CONTRIBUTOR } from '../../constants/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
});

export const useContributionList = () => {
  return useQuery(
    ['get-api-data'],
    async () => {
      try {
        const res = await api.get(`${CONTRIBUTOR.GET}`);
        console.log(res.data);
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

'use client';
import { BASE_URL, CONTRIBUTION } from '../../constants/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
});

export const useContributeList = () => {
  return useQuery(
    ['get-api-data'],
    async () => {
      try {
        const res = await api.get(`${CONTRIBUTION.GET}`);
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

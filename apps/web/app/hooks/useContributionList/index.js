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

export const useContributionList = (page, perPage, contributorId) => {
  return useQuery(
    ['get-contribution-list', page, perPage, contributorId],
    async () => {
      try {
        const res = await api.get(
          `${CONTRIBUTION.GET}?page=${page}&perPage=${perPage}&contributorId=${contributorId}`
        );
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

export const useContributionCount = (contributorId) => {
  return useQuery(
    ['get-contribution-count', contributorId],
    async () => {
      try {
        const res = await api.get(
          `${CONTRIBUTION.GET}?contributorId=${contributorId}`
        );
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

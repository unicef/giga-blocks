'use client';
import { BASE_URL, CONTRIBUTE } from '../../constants/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
});

export const useContributeList = () => {
  return useQuery(
    ['get-contribution-data'],
    async () => {
      try {
        const res = await api.get(`${CONTRIBUTE.GET}`);
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

export const useContributeDetails = (id) => {
  return useQuery(['get-contribute-details', id], async () => {
    const { data } = await api.get(`${CONTRIBUTE.GET}?schoolId=${id}`);
    return data;
  });
};

export const useContributionList = (page, perPage, contributorId, order) => {
  return useQuery(
    ['get-contribution-list', page, perPage, contributorId, order],
    async () => {
      try {
        const res = await api.get(
          `${
            CONTRIBUTE.GET
          }?page=${page}&perPage=${perPage}&contributorId=${contributorId}&order=${
            order ?? ''
          }`
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
          `${CONTRIBUTE.GET}?contributorId=${contributorId}`
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

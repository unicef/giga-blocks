'use client';
import { SCHOOLS } from '../../constants/api';
import { useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';

export const useContributionList = () => {
  try {
    return useQuery(
      ['get-contribution-list-data'],
      async () => {
        console.log('second');
        try {
          const res = await apiGuest.get(`${SCHOOLS.GET}`);
          console.log('API response:', res.data); // Log the API response
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
  } catch (error) {
    console.log(error);
  }
};

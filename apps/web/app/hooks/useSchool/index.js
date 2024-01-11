'use client';
import { BASE_URL, SCHOOLS } from '../../constants/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
});

export const useSchoolGet = (page, perPage, searchText) => {
  return useQuery(
    ['get-school-data', page, perPage, searchText],
    async () => {
      const { data } = await api.get(
        `${SCHOOLS.GET}?page=${page}&perPage=${perPage}&name=${searchText}`
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useSchoolDetails = (id) => {
  return useQuery(['get-school-details', id], async () => {
    const { data } = await api.get(`${SCHOOLS.GET}/${id}`);
    return data;
  });
};

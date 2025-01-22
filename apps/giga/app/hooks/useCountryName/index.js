'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCountryName = (lat, lng) => {
  return useQuery(
    ['country-name', lat, lng],
    async () => {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=country&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      );
      return res.data.features[0].text;
    },
    {
      keepPreviousData: true,
    }
  );
};

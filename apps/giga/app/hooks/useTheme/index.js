import { useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { THEME } from '../../constants/api';

export const useThemeGet = () => {
  return useQuery(['get-theme'], async () => {
    const { data } = await apiGuest.get(`${THEME.GET}`);
    return data;
  });
};

export const useThemePost = () => {};

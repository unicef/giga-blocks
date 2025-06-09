import { useMutation, useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { THEME } from '../../constants/api';

export const useThemeGet = () => {
  return useQuery(['get-theme'], async () => {
    const { data } = await apiGuest.get(`${THEME.GET}`);
    return data;
  });
};

export const useSchoolThemeGet = (name) => {
  return useQuery(
    ['get-school-theme', name],
    async () => {
      const { data } = await apiGuest(`${THEME.SCHOOL}/${name}`);
      return data;
    },
    { retry: false }
  );
};

export const useThemeUpdate = () => {
  return useMutation({
    mutationFn: async ({ schoolId, themeId }) => {
      const { data } = await apiGuest.patch(`${THEME.UPDATE}/${schoolId}`, {
        themeId,
      });
      return data;
    },
    onSuccess: () => {
      console.log('heme updated successfully!');
    },
    onError: (error) => {
      console.error('Theme update failed:', error);
    },
  });
};

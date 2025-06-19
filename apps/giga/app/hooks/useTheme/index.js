import { useMutation, useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { ENDPOINTS } from '../../constants/api';

export const useThemeGet = () => {
  return useQuery(['get-theme'], async () => {
    const { data } = await apiGuest.get(`${ENDPOINTS.THEME.GET}`);
    return data;
  });
};

export const useSchoolThemeGet = (name) => {
  return useQuery(
    ['get-school-theme', name],
    async () => {
      const { data } = await apiGuest(`${ENDPOINTS.THEME.SCHOOL}/${name}`);
      return data;
    },
    { retry: false }
  );
};

export const useThemeUpdate = () => {
  return useMutation({
    mutationFn: async ({ schoolId, themeId }) => {
      const { data } = await apiGuest.patch(
        `${ENDPOINTS.THEME.UPDATE}/${schoolId}`,
        {
          themeId,
        }
      );
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

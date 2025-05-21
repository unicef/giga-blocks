'use client';
import { QOS } from '../../constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';

export const useQOSDailyGet = (gigaSchoolId, enabled = true) => {
  return useQuery(
    ['get-qos-daily', gigaSchoolId],
    async () => {
      const { data } = await apiGuest.get(
        `${QOS.GET_DAILY}?giga_school_id=${gigaSchoolId}`
      );
      return data;
    },
    {
      enabled: !!schoolId && enabled,
    }
  );
};

export const useQOSWeeklyGet = (
  gigaSchoolId,
  startDate,
  endDate,
  enabled = true
) => {
  return useQuery(
    ['get-qos-weekly', gigaSchoolId],
    async () => {
      const { data } = await apiGuest.get(
        `${QOS.GET_DAILY}?giga_school_id=${gigaSchoolId}&startDate=${startDate}&endDate=${endDate}`
      );
      return data;
    },
    {
      enabled: !!schoolId && enabled,
    }
  );
};
export const useQOSMonthlyGet = (
  gigaSchoolId,
  startDate,
  endDate,
  enabled = true
) => {
  return useQuery(
    ['get-qos-monthly', gigaSchoolId],
    async () => {
      const { data } = await apiGuest.get(
        `${QOS.GET_DAILY}?giga_school_id=${gigaSchoolId}&startDate=${startDate}&endDate=${endDate}`
      );
      return data;
    },
    {
      enabled: !!schoolId && enabled,
    }
  );
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import client from '@utils/client';
import { useSnackbar } from '@components/snackbar';

type UseUpdateProfileResult = {
  loading: boolean;
  error: string | null;
  issuccess: boolean;
  updateProfile: (options: { API_URL: string; payload: object }) => Promise<void>;
};

const useUpdateProfile = (): UseUpdateProfileResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issuccess, setIsSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const updateProfile = async ({
    API_URL,
    payload,
  }: {
    API_URL: string;
    payload: object;
  }): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse = await client.patch(API_URL, payload);
      const { status } = response;
      if (status === 200) {
        setIsSuccess(true);
        enqueueSnackbar('Your profile has been updated successfully!', { variant: 'success' });
      } else {
        const msg = 'Profile Update failed...';
        setError(msg);
        enqueueSnackbar(msg, { variant: 'error' });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, issuccess, updateProfile };
};

export default useUpdateProfile;

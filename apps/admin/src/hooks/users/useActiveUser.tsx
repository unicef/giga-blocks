import { useState } from 'react';
import client from '@utils/client';
import { useSnackbar } from '@components/snackbar';

interface ActiveUserResponse {
  success: boolean;
  error?: string;
  message: string;
  data: {
    isActive: boolean; // Add this property
  };
}

const useActiveUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const activeUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await client.patch(`/users/${userId}/active`);
      const {
        statusText,
        data: { isActive },
      } = response;

      if (statusText === 'OK') {
        setIsSuccess(true);
        const snackbarMessage = isActive
          ? 'User has been successfully active!'
          : 'User has been in active!';
        enqueueSnackbar(snackbarMessage, { variant: isActive ? 'success' : 'error' });
        return isActive;
      }

      return null;
    } catch (e) {
      setError('Failed to active the user. Please try again later.');
      console.error('Failed to active the user:', e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, activeUser };
};

export default useActiveUser;

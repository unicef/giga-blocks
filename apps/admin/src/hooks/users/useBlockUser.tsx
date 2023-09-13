import { useState } from 'react';
import client from '@utils/client';
import { useSnackbar } from '@components/snackbar';

interface BlockUserResponse {
  success: boolean;
  error?: string;
  message: string;
  data: {
    isApproved: boolean; // Add this property
  };
}

const useBlockUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const blockUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await client.patch(`/users/${userId}/block`);
      const {
        statusText,
        data: { isBlocked },
      } = response;

      if (statusText === 'OK') {
        setIsSuccess(true);
        const snackbarMessage = isBlocked
          ? 'User has been successfully blocked!'
          : 'User has been unblocked!';
        enqueueSnackbar(snackbarMessage, { variant: isBlocked ? 'success' : 'error' });
        return isBlocked;
      }

      return null;
    } catch (e) {
      setError('Failed to block the user. Please try again later.');
      console.error('Failed to block the user:', e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, blockUser };
};

export default useBlockUser;

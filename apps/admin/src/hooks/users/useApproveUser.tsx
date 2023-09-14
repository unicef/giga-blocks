import { useState } from 'react';
import client from '@utils/client';
import { useSnackbar } from '@components/snackbar';

interface ApproveUserResponse {
  success: boolean;
  error?: string;
  message: string;
  data: {
    isApproved: boolean; // Add this property
  };
}

const useApproveUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const approveUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await client.patch(`/users/${userId}/approve`);
      const {
        statusText,
        data: { isApproved },
      } = response;

      if (statusText === 'OK') {
        setIsSuccess(true);
        const snackbarMessage = isApproved
          ? 'User has been successfully approved!'
          : 'User has been disapproved!';
        enqueueSnackbar(snackbarMessage, { variant: isApproved ? 'success' : 'error' });
        return isApproved;
      }

      return null;
    } catch (e) {
      setError('Failed to approve the user. Please try again later.');
      console.error('Failed to approve the user:', e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, approveUser };
};

export default useApproveUser;

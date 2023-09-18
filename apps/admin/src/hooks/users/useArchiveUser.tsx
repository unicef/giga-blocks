import { useState } from 'react';
import client from '@utils/client';
import { useSnackbar } from '@components/snackbar';

interface DeleteUserResponse {
  success: boolean;
  error?: string;
  message: string;
  data: {
    is_active: boolean; // Add this property
  };
}

const useArchiveUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const archiveUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const { data } = await client.patch<DeleteUserResponse>(`/users/archive/${userId}`);
      if (data?.success) {
        const { data: responseData } = data;
        setIsSuccess(true);
        enqueueSnackbar('User has been archived successfully', { variant: 'success' });
        return responseData?.is_active;
      }
      setError(data?.message || 'Unknown error occurred');
      enqueueSnackbar(data?.message || 'Unknown error occurred', { variant: 'error' });
      return true;
    } catch (catchError) {
      setError('Failed to archive the user.');
      console.error(catchError);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, archiveUser };
};

export default useArchiveUser;

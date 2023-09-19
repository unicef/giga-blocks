// import { useState } from 'react';
// import client from '@utils/client';
// import { useSnackbar } from '@components/snackbar';

// interface UserResponse {
//   success: boolean;
//   error?: string;
//   message: string;
// }

// const useUnarchiveUser = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorText, setErrorText] = useState<string | null>(null);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();

//   const unarchiveUser = async (userId: string) => {
//     setIsLoading(true);
//     setErrorText(null);
//     setIsSuccess(false);

//     try {
//       // Make an API request to unarchive the user with the given userId
//       const { data } = await client.patch<UserResponse>(`/users/unarchive/${userId}`);
//       const { success, message, data: responseData } = data;
//       if (success) {
//         setIsSuccess(true);
//         enqueueSnackbar('User has been unarchived!', { variant: 'success' });
//         return responseData.is_active;
//       }
//       setErrorText(message);
//       enqueueSnackbar(message, { variant: 'error' });
//       return false;
//     } catch (error) {
//       setErrorText('Failed to unarchive the user!');
//       console.error(error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isLoading, error: errorText, isSuccess, unarchiveUser };
// };

// export default useUnarchiveUser;

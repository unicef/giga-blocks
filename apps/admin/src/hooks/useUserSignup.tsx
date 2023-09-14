import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type UseUserSignupResult = {
  loading: boolean;
  error: string | null;
  successMsg: boolean;
  registerUser: (options: { API_URL: string; payload: object }) => Promise<void>;
};

const useUserSignup = (): UseUserSignupResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const registerUser = async ({
    API_URL,
    payload,
  }: {
    API_URL: string;
    payload: object;
  }): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse = await axios.post(API_URL, payload);
      const { success, message } = response.data;
      if (success) {
        setSuccessMsg(true);
      } else {
        setError(message);
      }
    } catch (e) {
      setError(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMsg, registerUser };
};

export default useUserSignup;

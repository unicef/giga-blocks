import { useState, useEffect } from 'react';
import client from '@utils/client';
import { BACKEND_URL } from 'src/config-global';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  position: string;
  affiliation: string;
}

interface Error {
  message: string;
}

const useUserProfile = (userId: number) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const API_URL = `${BACKEND_URL}/users/`;

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await client.get<UserProfile>(`${API_URL}${userId}`);
        const { data } = response;
        setUserProfile(data);
        setLoading(false);
      } catch (e: any) {
        setError({ message: e.response?.data.message || 'Something went wrong' });
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId, API_URL]);

  return { userProfile, loading, error };
};

export default useUserProfile;

import { useState } from 'react';
import { IUserAccountGeneral } from 'src/@types/user';
import { useAdministrationContext } from '@contexts/administration';

interface Error {
  message: string;
}

const useFilterLists = () => {
  const [filterList, setFilterList] = useState<IUserAccountGeneral[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { getFilteredUsers } = useAdministrationContext();
  const fetchFilterLists = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      // const { data } = await client.get<UserData>(`${API_URL}`);
      const data: IUserAccountGeneral[] = await getFilteredUsers(query);
      setFilterList(data);
      setLoading(false);
    } catch (e: any) {
      setError({ message: e.response?.data.message || 'Something went wrong' });
      setLoading(false);
    }
  };

  return { fetchFilterLists, filterList, loading, error };
};

export default useFilterLists;

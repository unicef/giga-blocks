import { useCallback, useState } from 'react';
import client from '@utils/client';
import { AxiosResponse } from 'axios';

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AxiosResponse<any, any> | null>(null);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const response = await client.get(url);
      setData(response.data);
      setError('');
      return response?.data;
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  const post = async (url: string, newData: any) => {
    try {
      setLoading(true);
      await client.post(url, newData);
      setError('');
      await fetchData(url);
    } catch (err) {
      setError('Error updating data');
    } finally {
      setLoading(false);
    }
  };

  const update = async (url: string, id: string, newData: any) => {
    try {
      setLoading(true);
      await client.put(`${url}/${id}`, newData);
      setError('');
      await fetchData(url);
    } catch (err) {
      setError('Error updating data');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (url: string, id: string) => {
    try {
      setLoading(true);
      await client.delete(`${url}/${id}`);
      setError('');
      await fetchData(url);
    } catch (err) {
      setError('Error deleting data');
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData, post, update, remove };
};

export default useApi;

import client from '@utils/client';
import { AxiosResponse } from 'axios';

type User = {};

export const AdministrationService = {
  getUsersList(): Promise<AxiosResponse<User[]>> {
    return client.get<User[]>('/users');
  },

  getUserById(id: string): Promise<AxiosResponse<User>> {
    return client.get<User>(`/users/${id}`);
  },

  updateUser(id: string, data: Partial<User>): Promise<AxiosResponse<User>> {
    return client.patch<User>(`/users/${id}`, data);
  },

  deleteUser(id: string): Promise<AxiosResponse<User>> {
    return client.delete<User>(`/users/${id}`);
  },

  filterUsersList(query: string): Promise<AxiosResponse<User[]>> {
    return client.get(`/users/search?${query}`);
  },
};

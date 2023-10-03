import jwtDecode from 'jwt-decode';
import { metaMask } from "@hooks/web3/metamask";
interface User {
  // Define your user properties here
}

const storage: Storage | null = typeof window !== 'undefined' ? window.localStorage : null;

export const getCurrentUser = (): User | null => {
  let user: User | null = null;
  const data = storage ? storage.getItem('currentUser') : '';
  if (data) user = JSON.parse(data);
  return user;
};

export const saveCurrentUser = (userData: User): void =>
  storage ? storage.setItem('currentUser', JSON.stringify(userData)) : undefined;

export const saveKey = (key: string): void =>
  storage ? storage.setItem('key', JSON.stringify(key)) : undefined;

export const getKey = (): string | null =>
  storage ? JSON.parse(storage.getItem('key') || 'null') : null;

export const getAccessToken = (): string | null =>
  storage ? storage.getItem('accessToken') : null;

export const saveAccessToken = (accessToken: string): void =>
  storage ? storage.setItem('accessToken', accessToken) : undefined;

export const deleteAccessToken = (): void =>
  storage ? storage.removeItem('accessToken') : undefined;

export const saveConnectors = (connector:string):void    =>
  storage ? storage.setItem('auth', connector) : undefined;

export const deleteConnectors = () =>
  storage ? storage.removeItem('auth') : undefined;

export const clearStorage = (): void => {
  if (storage) {
    storage.clear();
  }
  if (metaMask?.deactivate) {
    void metaMask.deactivate();
  } else {
    void metaMask.resetState();
  }
};

export const isValidToken = (accessToken: string | null): boolean => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<Record<string, any>>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

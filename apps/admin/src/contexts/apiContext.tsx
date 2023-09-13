import React, { createContext, ReactNode } from 'react';
import useApi from '@hooks/useApi';

export interface ApiContextType {
  fetchData: (url: string) => Promise<void>;
  post: (url: string, newData: any) => Promise<void>;
  update: (url: string, id: string, newData: any) => Promise<void>;
  remove: (url: string, id: string) => Promise<void>;
  loading: boolean;
  data: any;
  error: string;
}

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

interface ApiContextProviderProps {
  children: ReactNode;
}

const ApiContextProvider: React.FC<ApiContextProviderProps> = ({ children }) => {
  const api = useApi();
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiContextProvider };

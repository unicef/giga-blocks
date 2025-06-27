'use client';
import { cacheExchange, Client, fetchExchange, Provider } from 'urql';
import { ENDPOINTS } from '../constants/api';

const GarphQlProvider = ({ children }) => {
  const QueryURL = ENDPOINTS.GRAPH_URL;
  const client = new Client({
    url: QueryURL,
    exchanges: [cacheExchange, fetchExchange],
  });
  return <Provider value={client}>{children}</Provider>;
};

export default GarphQlProvider;

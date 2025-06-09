import axios from 'axios';
import { BASE_URL } from '../constants/api';
import { getAccessToken } from '../utils/sessionManager';

const createApi = (accessToken = null) => {
    const api = axios.create({
      baseURL: BASE_URL,
    });
  
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  
    return api;
  };

  const accessToken = getAccessToken();
  const api = createApi(accessToken);
  const apiGuest = createApi(); 


export {api, apiGuest};
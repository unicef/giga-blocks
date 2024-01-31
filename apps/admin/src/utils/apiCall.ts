import axios from "axios";
import { getAccessToken } from "./sessionManager";
import routes from '../constants/api';

const api = axios.create({
    baseURL: routes.BASE_URL,
  });
  
  const accessToken = getAccessToken();
  
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export default api;
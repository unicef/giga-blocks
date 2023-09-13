import axios from 'axios';
// import qs from 'query-string';
import { BACKEND_URL } from '../config-global';

import { getAccessToken } from './sessionManager';

const accessToken = getAccessToken();

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Bearer ${accessToken}`,
    access_token: accessToken,

    // report_token: '6E4(WdnI5ukyHDaqy-AKEZvT$7JDnrQG',
  },
  // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

api.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || {
        ...error,
        message: 'Something went wrong. Please Contact SuperAdmin',
      }
    )
);

export default api;

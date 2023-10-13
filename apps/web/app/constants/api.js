export const BASE_URL =
  process.env.NEXT_PUBLIC_D3_BACKEND || 'http://localhost:3333/api/v1';

const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;

module.exports = {
  BASE_URL,
  GRAPH_URL,
  NEWSLETTER: {
    REGISTER: '/newsletters',
  },
  SCHOOLS: {
    GET: '/schools',
  },
  OTP: {
    REGISTER: '/auth/send-otp',
  },
  SIGNUP: {
    REGISTER: '/auth/register',
  },
  NONCE: {
    GETNONCE: '/auth/getnonce',
  },
  WALLETREGISTER: {
    WALLETREGISTER: '/auth/walletregister',
  },
  WALLETLOGIN: {
    WALLETLOGIN: '/auth/walletlogin',
  },
};

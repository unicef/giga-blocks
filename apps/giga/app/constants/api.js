export const BASE_URL =
  process.env.NEXT_PUBLIC_D3_BACKEND || 'http://localhost:3333/api/v1';

const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;

export const ENDPOINTS = {
  BASE_URL,
  GRAPH_URL,
  NEWSLETTER: {
    REGISTER: '/newsletters',
  },
  SCHOOLS: {
    GET: '/schools',
    ACTIVATE: '/schools/reserveNft',
    CLAIM: '/schools/claimSchool',
    PAIDACTIVATION: '/schools/activateSchool',
    COUNTRIES: '/schools/countries',
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
    WALLETREGISTER: '/auth/walletRegister',
  },
  WALLETLOGIN: {
    WALLETLOGIN: '/auth/walletlogin',
  },
  LOGIN: {
    LOGIN: '/auth/login',
  },
  CONTRIBUTOR: {
    LIST: '/contributor',
    PATCH: '/contributor/update',
    GET: '/contributor/walletAddress',
  },
  LINKACTIVATION: {
    GET: '/linkactivation/validateLink',
  },
  CONTRIBUTE: {
    LIST: '/contribute',
    POST: '/contribute',
  },
  MAGICLINK: {
    SEND: '/magic-link/send',
    VERIFY: 'magic-link/verify',
  },
  THEME: {
    GET: '/schools/themes',
    SCHOOL: '/schools/theme',
    POST: '/schools/themes',
    UPDATE: '/schools/updateTheme',
  },
  GAS_FEE: {
    GET: process.env.NEXT_PUBLIC_GAS_API,
  },
  FEATURED: {
    GET: '/featured/school',
  },
  QOS: {
    DAILY: '/schools/qos/daily',
    WEEKLY: '/schools/qos/weekly',
    MONTHLY: '/schools/qos/monthly',
  },
  METRICS: {
    GET: '/schools/gigaMetrics',
  },
  CIW:{
    AUTHREQUEST:'/verifier/sign-in'
  }
};

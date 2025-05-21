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
    ACTIVATE: '/schools/reserveNft',
    CLAIM: '/schools/claimSchool',
    PAIDACTIVATION: '/schools/activateSchool',
    COUNTRIES:'/schools/countries',
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
    GET: '/contributor',
    PATCH: '/contributor/update',
  },
  LINKACTIVATION: {
    GET: '/linkactivation/validateLink',
  },
  CONTRIBUTE: {
    GET: '/contribute',
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
  QOS:{
    DAILY:'/qos/daily',
    WEEKLY:'/qos/weekly',
    MONTHLY:'/qos/monthly',
  }
};

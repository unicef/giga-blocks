const BASE_URL = "http://localhost:3333/api/v1";


export  default {
  BASE_URL,
  NEWSLETTER: {
    REGISTER: "/newsletters",
  },
  SCHOOLS: {
    GET: "/schools",
  },
  OTP: {
    REGISTER: "/auth/send-otp",
  },
  SIGNUP: {
    REGISTER: "/auth/register",
  },
  GETNONCE: {
    GET: '/auth/getnonce'
  },
  WALLET_LOGIN: {
    POST: '/auth/walletlogin'
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_D3_BACKEND;


export  default {
  BASE_URL,
  NEWSLETTER: {
    REGISTER: "/newsletters",
  },
  SCHOOLS: {
    GET: "/schools",
    MINT:"/schools/mintSchool",
    MINTBULK: "/schools/mintBulk",
    SCHOOLCOUNT: "/schools/schoolCount"
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
  },
  USER :{
    GET : "/users"
  },
  REFRESH :{
    POST: '/auth/refresh'
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_D3_BACKEND;
const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;


export  default {
  BASE_URL,
  GRAPH_URL,
  NEWSLETTER: {
    REGISTER: "/newsletters",
  },
  SCHOOLS: {
    GET: "/schools",
    MINT:"/schools/mintSchool",
    MINTBULK: "/schools/mintBulk",
    SCHOOLCOUNT: "/schools/schoolCount",
    UPLOAD: "/schools/upload",
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

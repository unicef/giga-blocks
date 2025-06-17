const BASE_URL = process.env.NEXT_PUBLIC_D3_BACKEND;
const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;

export default {
  BASE_URL,
  GRAPH_URL,
  NEWSLETTER: {
    REGISTER: '/newsletters',
  },
  SCHOOLS: {
    GET: '/schools',
    MINT: '/schools/mintSchool',
    MINTBULK: '/schools/mintBulk',
    SCHOOLCOUNT: '/schools/schoolCount',
    UPLOAD: '/schools/uploadFile',
    GIGAID: '/schools/gigaSchoolId',
    UPDATEIMAGE:'/schools/updateImages',
    GETIMAGEUPDATELIST:'/schools/imageUpdate'
  },
  CONTRIBUTE: {
    GET: '/contribute',
    PATCH: '/contribute',
  },
  VALIDATE: {
    GET: '/contribute/validated',
    PATCH: '/schools/update',
    PATCHBULK: '/schools/bulkUpdate',
  },
  OTP: {
    REGISTER: '/auth/send-otp',
  },
  SIGNUP: {
    REGISTER: '/auth/register',
  },
  GETNONCE: {
    GET: '/auth/getnonce',
  },
  WALLET_LOGIN: {
    POST: '/auth/admin/walletlogin',
  },
  USER: {
    GET: '/users',
  },
  REFRESH: {
    POST: '/auth/refresh',
  },
  LINK_ACTIVATION: {
    POST: '/linkactivation',
    GET: '/linkactivation',
    ACTIVATE: 'linkactivation/activate',
    DEACTIVATE: 'linkactivation/deactivate',
  },
};
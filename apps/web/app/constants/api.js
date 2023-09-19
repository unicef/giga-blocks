export const BASE_URL =
  process.env.NEXT_PUBLIC_D3_BACKEND || "http://localhost:3333/api/v1";

module.exports = {
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
};

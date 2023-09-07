export const BASE_URL =
  process.env.NEXT_APP_API_URL || "https://api.giga.rumsan.net/api/v1";

module.exports = {
  BASE_URL,
  NEWSLETTER: {
    REGISTER: "/newsletters",
  },
  SCHOOLS: {
    GET: "/schools",
  },
};

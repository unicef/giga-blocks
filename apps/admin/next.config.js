module.exports = {
  swcMinify: false,
  trailingSlash: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    // HOST
    HOST_API_KEY: "https://api-dev-minimal-v4.vercel.app",
  },
};

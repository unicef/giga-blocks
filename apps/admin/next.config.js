//@ts-check

const { withNx } = require("@nrwl/next/plugins/with-nx");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  basePath: '/admin', // Ensures all routes start with /admin
  assetPrefix: '/admin', // Ensures assets are prefixed with /admin
  images: {
    loader: 'default', // Default loader ensures assets are processed correctly
    path: '/admin/_next/image', // Use path with basePath applied
  },
};

module.exports = withNx(nextConfig);

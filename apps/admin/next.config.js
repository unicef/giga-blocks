//@ts-check

const { withNx } = require("@nrwl/next/plugins/with-nx");
const basePath = process.env.NEXT_PUBLIC_ADMIN_BASE_PATH || '';

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  basePath: `${basePath}`, 
};

module.exports = withNx(nextConfig);

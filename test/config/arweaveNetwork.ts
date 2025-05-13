import Arweave from "arweave";
require('dotenv').config();

export const arweave = Arweave.init({
    host: process.env.ARWEAVE_HOST,
    port: +process.env.ARWEAVE_PORT,
    protocol: process.env.ARWEAVE_PROTOCOL,
    timeout: 20000,
    logging: false,
  });
const keys = process.env.AREWAVE_CONFIG

const decodedValue = Buffer.from(keys, 'base64').toString('utf-8')
// const filePath = path.join(process.cwd(), "apps/api/src/utils/arweave/config/wallet.json");
export const key = JSON.parse( decodedValue);
// export const key ="test"

import * as fs from 'fs';
import * as path from 'path';

const basepath = path.join(__dirname, '../abi/');

export const getAbi = (contract: string) => {
  const data = fs.readFileSync(`${basepath}${contract}.json`, 'utf8');
  const { contractName, abi } = JSON.parse(data);
  return { contractName, abi };
};

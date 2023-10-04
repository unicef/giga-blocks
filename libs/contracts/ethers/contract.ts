import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

export class Contract {
  constructor(private readonly network: string) {}

  basepath = path.join(__dirname, '../abi/');

  public getContract = (contractName: string, contractAddress: string) => {
    try {
      const provider = new ethers.JsonRpcProvider(this.network);
      const abi = this.getAbi(contractName);
      const contract = new ethers.Contract(contractAddress, abi.abi, provider);
      return contract;
    } catch (err) {
      throw new Error(`Error: ${err}, message: Cannot instatntiate contract`);
    }
  };

  public getInterface = (contractName: string) => {
    try {
      const abi = this.getAbi(contractName);
      const iface = new ethers.Interface(abi.abi);
      return iface;
    } catch (err) {
      throw new Error(`Error: ${err}, message: Cannot instatntiate contract`);
    }
  };

  public getAbi = (contract: string) => {
    const data = fs.readFileSync(`${this.basepath}${contract}.json`, 'utf8');
    const { contractName, abi } = JSON.parse(data);
    return { contractName, abi };
  };
}

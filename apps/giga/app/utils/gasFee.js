import axios from 'axios';
import { GAS_FEE } from '../constants/api';
import { etherUnits, formatUnits } from 'viem';
export const getGasPrice = async () => {
  const apiToken = process.env.NEXT_PUBLIC_GAS_API_KEY;
  const data = await axios.get(
    `${GAS_FEE.GET}?module=proxy&action=eth_gasPrice&apikey=${apiToken}`
  );
  const gasPriceHex = BigInt(data.data?.result).toString();
  const gasPriceInEth = formatUnits(gasPriceHex, 18);
  return gasPriceInEth;
};

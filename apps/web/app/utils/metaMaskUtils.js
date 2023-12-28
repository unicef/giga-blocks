import { metaMask } from '../components/web3/connectors/metamask';
import { Default_Chain_Id } from '../components/web3/connectors/network';

export const metaMaskLogin = async () => {
  let res;
  try {
    res = await metaMask.activate(Default_Chain_Id);
  } catch (err) {
    if (err.code === 4902) {
      return await switchMetaMaskNetwork();
    }
  }
  return res;
};

export const metaMaskLogout = async () => {
  try {
    await metaMask.resetState()
  } catch (err) {
    console.log(err);
  }
};

export const switchMetaMaskNetwork = async () => {
  const network = {
    chainId: Default_Chain_Id,
    chainName: 'Polygon-Mumbai',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'Matic',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  };
  const res = await metaMask.activate(network);
  return res;
};

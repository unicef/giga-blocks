import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { DEFAULT_CHAIN_ID , TESTNET_CHAINS} from "../chains";
import { GnosisSafe } from "@web3-react/gnosis-safe";

export const metaMaskLogin = async (connector:MetaMask) => {

    try{
        await connector.activate(Number(DEFAULT_CHAIN_ID));

    }
    catch(e){
        // if(e.code === 4902){
        //     await switchMetaMaskNetwork(connector);
        // }
         if(e.code === 4001){
            throw new Error('User rejected the request');
        }
    }


}

// export const switchMetaMaskNetwork = async (connector:MetaMask) => {
//     const network = {
//       chainId: Number(DEFAULT_CHAIN_ID),
//       chainName: 'Etherum-Sepolia',
//       nativeCurrency: {
//         name: 'ETH',
//         symbol: 'ETH',
//         decimals: 18,
//       },
//       rpcUrls: [TESTNET_CHAINS[DEFAULT_CHAIN_ID].urls[0]],
//       blockExplorerUrls: [TESTNET_CHAINS[DEFAULT_CHAIN_ID].blockExplorerUrls[0] || ''  ],
//     };
//     console.log(network)
//     const res = await connector.activate(network);
//   };
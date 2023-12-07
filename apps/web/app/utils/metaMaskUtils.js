import {metaMask} from '../components/web3/connectors/metamask';
import {Default_Chain_Id} from '../components/web3/connectors/network';

export const metaMaskLogin = async()=>{
    let res;
   try{ 
     res =  await  metaMask.activate(Default_Chain_Id);
   }
    catch(err){
        console.log("error metaMask", err)
        if(err.code === 4902){
            res = await switchNetwork();
    
    }
    }
    return res;
}

export const switchMetaMaskNetwork = async()=>{
  const network ={
    chainId: Default_Chain_Id,
    chainName: 'Arbitrum Goerli',
    nativeCurrency: {
      name: 'AGOR',
      symbol: 'AGOR',
      decimals: 18,
    },
    rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://etherscan.io/'],
  }
  const res = await  metaMask.activate(network);
  return res;
}
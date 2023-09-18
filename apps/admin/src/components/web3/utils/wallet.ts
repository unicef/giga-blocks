import { useWeb3React } from "@web3-react/core";
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';



export const sign = async (config:any,nonce:string)=>{
       
        if (!config.provider || !config.account) return;
        console.log("nonce",nonce)
        let signature = await config.provider.getSigner(config.account).signMessage(nonce);
        signature = `${nonce}:${signature}`;
        return signature;
    // const { provider, account } = useWeb3React();
    // if (!provider || !account) return;
    // let signature = await provider.getSigner(account).signMessage(nonce);
    // signature = `${nonce}:${signature}`;
    // return signature;
}

export const useLogout = async ()=>{
    const logout = async ()=>{
        const { connector } = useWeb3React();
        if (!connector) return;
        void connector.deactivate();
    }
}
// export const logout = async (connector : MetaMask | Network) =>{
//     void connector.deactivate();
// }


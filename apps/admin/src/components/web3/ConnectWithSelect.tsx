import { Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { sign } from './utils/wallet';
import { JsonRpcProvider, Signer } from "ethers";
import { useLoginWallet, useNonceGet } from '@hooks/web3/useMetamask';
import { useRouter } from 'next/router';
import { saveAccessToken, saveCurrentUser } from '@utils/sessionManager';

function ChainSelect({
  activeChainId,
  connectWallet,
}: {
  activeChainId: number;
  connectWallet: () => void;
}) {
  return (
    <Button variant="contained" value={activeChainId} onClick={(e) => { connectWallet() }}>Connect Metamask</Button>
  );
}

export function ConnectWithSelect({
  connector,
  activeChainId,
  isActivating,
  isActive,
  error,
  provider,
  setError,
}: {
  connector: MetaMask | Network | GnosisSafe;
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[];
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error: Error | undefined;
  provider: ReturnType<Web3ReactHooks['useProvider']>
  setError: (error: Error | undefined) => void;
}) {

  const [desiredChainId, setDesiredChainId] = useState<any>(undefined);

  const {data: nonceData, isSuccess: isNonceSuccess} = useNonceGet()

  const {push}= useRouter()

  const {mutate, isError, data:loginWalletData , isSuccess:isLoginWalletSuccess, error: loginWalletError} = useLoginWallet()

  const getSignature = async () => {
    if(isNonceSuccess){
      try {
        const signer = (provider as unknown as JsonRpcProvider).getSigner() as unknown as Signer;
        const address = await signer.getAddress()
        signer.signMessage(nonceData?.nonce)
        .then((res) => {
        const signature = `${nonceData?.nonce}:${res}`
        mutate({walletAddress: address, signature})
        })
        .catch((err) => {
          console.log(err)
        });
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    isError && console.log(loginWalletError)
    console.log(loginWalletData)
    if(isLoginWalletSuccess){
      const currentUser = {
        email: loginWalletData.data.email,
        username: loginWalletData.data.name
      }
      saveCurrentUser(currentUser)
      saveAccessToken(loginWalletData.data.access_token)
      
      push('/dashboard')
    }
  }, [isError, isLoginWalletSuccess])

  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId);
    }
    console.log("sign metamask 2", isActive)
    // if (isActive) {
    //   getSignature()
    // }
  }, [desiredChainId, activeChainId]);


  const connectWallet = useCallback(async () => {
    try {
      setError(undefined);

      await connector.activate();


      console.log("sign metamask 1")
    } catch (error) {
      console.log("error", error)
      setError(error);
    }
  }, [connector, setError]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div style={{ marginBottom: '1rem' }} />
      {isActive ? (
        error ? (
          <Button variant="contained" color='error' onClick={() => connectWallet()}>Try again?</Button>
        ) : (
          <>
          <Button variant="contained" color='error'
            onClick={() => {
              if (connector?.deactivate) {
                void connector.deactivate();
              } else {
                void connector.resetState();
              }
              setDesiredChainId(undefined);
            }}
          >
            Disconnect
          </Button>

          <Button variant="contained" color='secondary'
            onClick={() => {getSignature()}}
            style={{marginTop: '20px'}}
          >
            Login with metamask
          </Button>
          </>
        )
      ) : (
        <ChainSelect activeChainId={desiredChainId} connectWallet={connectWallet} />
      )}
    </div>
  );
}
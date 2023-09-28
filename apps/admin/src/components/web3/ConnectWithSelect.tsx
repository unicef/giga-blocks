import { Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { sign } from './utils/wallet';
import { JsonRpcProvider, Signer } from "ethers";

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

  const getSignature = async () => {
    try {
      const signer = (provider as unknown as JsonRpcProvider).getSigner() as unknown as Signer;
      const sig = await signer.signMessage("1234");
    }
    catch (e) {
      console.log(e)
    }
  }
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
          <Button variant="contained" color='error'
            onClick={() => {
              // if (connector?.deactivate) {
              //   void connector.deactivate();
              // } else {
              //   void connector.resetState();
              // }
              // setDesiredChainId(undefined);
              getSignature()
            }}
          >
            Disconnect
          </Button>
        )
      ) : (
        <ChainSelect activeChainId={desiredChainId} connectWallet={connectWallet} />
      )}
    </div>
  );
}
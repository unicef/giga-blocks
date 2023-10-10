import { Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Button } from '@mui/material';
import { loginSignature } from './utils/wallet';
import { JsonRpcProvider, Signer } from 'ethers';
import { useLoginWallet, useNonceGet } from '@hooks/web3/useMetamask';
import { useRouter } from 'next/router';
import { useSnackbar } from '@components/snackbar';
import {
  saveAccessToken,
  saveConnectors,
  saveCurrentUser,
  saveRefreshToken,
} from '@utils/sessionManager';

function ChainSelect({
  activeChainId,
  connectWallet,
}: {
  activeChainId: number;
  connectWallet: () => void;
}) {
  return (
    <Button
      variant="contained"
      value={activeChainId}
      onClick={(e) => {
        connectWallet();
      }}
    >
      Connect Metamask
    </Button>
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
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  setError: (error: Error | undefined) => void;
}) {
  const [desiredChainId, setDesiredChainId] = useState<any>(undefined);
  const [enableGetNonce, setEnableGetNonce] = useState<boolean>(true);

  const { data: nonceData, isSuccess: isNonceSuccess, isError:isNonceError } = useNonceGet(enableGetNonce);
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const { setAuthState } = useAuthContext();

  const {
    mutate,
    isError,
    data: loginWalletData,
    isSuccess: isLoginWalletSuccess,
    error: loginWalletError,
  } = useLoginWallet();

  const getSignature = useCallback(async () => {
    if(!isActive && JsonRpcProvider) return ;
    if (isNonceSuccess) {
      setEnableGetNonce(false);
      try {
        const signer = (provider as unknown as JsonRpcProvider).getSigner() as unknown as Signer;
        const address = await signer.getAddress();
        const signature = await loginSignature(signer, nonceData?.nonce);
        if (!signature){ 
          enqueueSnackbar("Invalid Signature", { variant: 'error' })
          return Error('Signature is null');
        }
        mutate({ walletAddress: address, signature });
      } catch (err) {
        enqueueSnackbar(err.message, { variant: 'error' })
      }
    }
    else {
      enqueueSnackbar("Invalid Nonce", { variant: 'error' })
    }
  }, [isNonceSuccess,isActive, JsonRpcProvider]);

  useEffect(() => {
    isNonceError && enqueueSnackbar("Couldn't get Nonce", { variant: 'error' })
  }, [isNonceError])

  useEffect(() => {
    //@ts-ignore
    isError && enqueueSnackbar(loginWalletError.response.data.message, { variant: 'error' })
    if (isLoginWalletSuccess) {
      const currentUser = {
        email: loginWalletData.data.email,
        username: loginWalletData.data.name,
        userId: loginWalletData.data.id,
        role: loginWalletData.data.role,
      };
      setAuthState((prev: any) => ({
        ...prev,
        isAuthenticated: true,
        isInitialized: true,
        token: loginWalletData.data.access_token,
        user: currentUser,
      }));
      saveCurrentUser(currentUser);
      saveAccessToken(loginWalletData.data.access_token);
      saveRefreshToken(loginWalletData.data.refresh_token);
      saveConnectors('metaMask');
      push('/dashboard');
    }
  }, [isError, isLoginWalletSuccess]);

  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId);
    }
    // }
  }, [desiredChainId, activeChainId]);

  const connectWallet = useCallback(async () => {
    setEnableGetNonce(false);
    try {
      setError(undefined);
      await connector.activate();
    } catch (error) {
      console.log('error', error);
      setError(error);
    }
  }, [connector, setError]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <div style={{ marginBottom: '1rem' }} />
      {isActive ? (
        error ? (
          <Button variant="contained" color="error" onClick={() => connectWallet()}>
            Try again?
          </Button>
        ) : (
          <>
            <Button
              sx={{ marginRight: '15px' }}
              variant="contained"
              color="secondary"
              onClick={() => {
                getSignature();
              }}
            >
              Login with metamask
            </Button>
            <Button
              variant="contained"
              color="error"
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
          </>
        )
      ) : (
        <ChainSelect activeChainId={desiredChainId} connectWallet={connectWallet} />
      )}
    </div>
  );
}

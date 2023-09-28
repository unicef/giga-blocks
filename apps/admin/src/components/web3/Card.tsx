"use client";

import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";

// import { getName } from '../utils'
// import { Accounts } from './Accounts'
// import { Chain } from './Chain'
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions, Typography } from "@mui/material";
import { ConnectWithSelect } from "./ConnectWithSelect";
import { Status } from "./status";
import { Chain } from "./chain";
import { Accounts } from "./account";

interface Props {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  chainIds?: ReturnType<Web3ReactHooks["useChainId"]>[];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: any;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
  provider?: ReturnType<Web3ReactHooks["useProvider"]>;
  accounts?: string[];
}

export function Card({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}: Props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "30vw",
          padding: "1rem",
          overflow: "auto",
          borderRadius: "1rem",
          border: "1px solid #efefef",
        }}
      >
        <div style={{ marginBottom: "1rem", color: "white" }}>
          <Status isActivating={isActivating} isActive={isActive} error={error} />
        </div>
        {/* <div style={{ color: "white" }}>
          <Chain chainId={activeChainId} />
        </div> */}
        <div style={{ marginBottom: "1rem", color: "white" }}>
          <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
        </div>
        <ConnectWithSelect
          connector={connector}
          activeChainId={activeChainId}
          chainIds={chainIds}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
          setError={setError}
          provider={provider}
        />
      </div>
    </>
  );
}

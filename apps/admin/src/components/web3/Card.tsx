"use client";

import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import  ConnectWithSelect  from "./ConnectWithSelect";
import { Status } from "./status";
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

export default function Card({
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
          width: "100%",
          padding: "1rem",
          overflow: "auto",
          borderRadius: "1rem",
          border: "1px solid #efefef",
        }}
      >
        <div style={{ marginBottom: "1rem", color: "white" }}>
          <Status isActivating={isActivating} isActive={isActive} error={error} />
        </div>
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

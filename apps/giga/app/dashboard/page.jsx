// pages/Dashboard.jsx
'use client';

import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Queries } from '../libs/graph-query';
import './_dashboard.scss';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton';
import DashboardHeader from '../../components/dashboard/Header';
import LatestActivatedSchool from '../../components/dashboard/latestActivation';
import MySchoolsSection from '../../components/dashboard/MySchoolSection';
import NotActivatedContent from '../../components/dashboard/NotActivated';
import { ConnectKitButton } from 'connectkit';
import { Modal, Button } from '@carbon/react';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false); // State for copy functionality
  const { address, isConnected, isConnecting } = useAccount();
  const router = useRouter(); // Initialize useRouter here

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      setShowModal(true);
    } else if (isConnected) {
      setShowModal(false);
    }
  }, [isConnected, isConnecting]);

  const [result] = useQuery({
    query: Queries.collectorOwnedNftsQuery,
    variables: { id: address },
  });

  const { data, fetching } = result;

  const decodedShooldata = data?.collectorOwnedNft?.nfts
    ?.map((d) => {
      try {
        const decoded = atob(d?.tokenUri?.substring(29));
        const token = d?.id;
        const parseddata = JSON.parse(decoded);
        return {
          tokenId: token,
          ...parseddata,
        };
      } catch (e) {
        console.error('Failed to decode tokenUri', e);
        return null;
      }
    })
    .filter(Boolean);

  // Handle copy functionality
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  // Handle activate schools button click
  const handleActivateSchoolsClick = () => {
    router.push('/schools/list?minted=NOTMINTED');
  };

  return (
    <>
      <Modal
        open={showModal}
        passiveModal
        size="sm"
        onRequestClose={() => setShowModal(false)}
        modalHeading="Wallet not connected"
      >
        <p>To view your dashboard, please connect your wallet.</p>
        <div style={{ marginTop: '30px' }}>
          <ConnectKitButton />
        </div>
      </Modal>

      {!fetching ? (
        <div className="dashboard-container">
          <DashboardHeader
            address={address}
            isConnected={isConnected}
            isConnecting={isConnecting}
            copied={copied}
            handleCopy={handleCopy}
          />

          {data?.collectorOwnedNft?.nfts ? (
            <>
              <LatestActivatedSchool decodedShooldata={decodedShooldata} />
              <MySchoolsSection
                decodedShooldata={decodedShooldata}
                fetching={fetching}
              />
            </>
          ) : (
            <NotActivatedContent handleClick={handleActivateSchoolsClick} />
          )}
        </div>
      ) : (
        <CardSkeleton count={4} />
      )}
    </>
  );
}

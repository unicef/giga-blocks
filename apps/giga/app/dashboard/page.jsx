'use client';

import { Modal, Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { ConnectKitButton } from 'connectkit';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useAccount } from 'wagmi';
import SchoolCard from '../../components/schoolCard/SchoolCard';
import { Queries } from '../libs/graph-query';
import { Copy, TaskComplete } from '@carbon/icons-react';
import './_dashboard.scss';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const { address, isConnected, isConnecting } = useAccount();

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

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
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
      <div className="dashboard-container">
        <div className="dashboard-top-section">
          <section className="profile-section">
            <div className="profile-image-container">
              <Image
                src={'/images/teams/team-1.png'}
                alt="Profile avatar"
                width={100}
                height={100}
                className="profile-image"
              />
            </div>
            <h1 className="profile-name">
              {isConnecting ? (
                <p> Connecting...</p>
              ) : !isConnected ? (
                <p>Wallet not connected</p>
              ) : (
                <>
                  {address?.slice(0, 4) + '...' + address?.slice(35, 43)}
                  {copied ? (
                    <TaskComplete
                      size={20}
                      style={{
                        marginLeft: '12px',
                        cursor: 'pointer',
                        color: '#A8A8A8',
                      }}
                      title="Copied!"
                    />
                  ) : (
                    <Copy
                      size={20}
                      style={{
                        marginLeft: '12px',
                        cursor: 'pointer',
                        color: '#A8A8A8',
                      }}
                      onClick={handleCopy}
                      title="Copy Address"
                    />
                  )}
                </>
              )}
            </h1>
          </section>

          {/* Latest School Reservation */}
          <section className="latest-reservation">
            <div className="reservation-card">
              <div className="reservation-info">
                <span className="reservation-label">
                  Latest School Activated
                </span>
                {decodedShooldata?.length > 0 ? (
                  <>
                    <h2 className="school-name">
                      {decodedShooldata[0]?.schoolName}
                    </h2>
                    <p className="school-location">
                      {decodedShooldata[0]?.region}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="school-name">Loading...</h2>
                    <p className="school-location">
                      Fetching latest activation
                    </p>
                  </>
                )}
              </div>
              <div className="reservation-image-container">
                {decodedShooldata?.length > 0 ? (
                  <Image
                    src={`https://ipfs.io/ipfs/${decodedShooldata[0]?.image}`}
                    alt={`Image of ${decodedShooldata[0]?.schoolName}`}
                    width={400}
                    height={300}
                    className="reservation-image"
                  />
                ) : (
                  <Image
                    src="/placeholder.svg"
                    alt="Loading"
                    width={300}
                    height={200}
                    className="reservation-image"
                  />
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Reserved Schools Section */}
        <section className="reserved-schools-section">
          <h2 className="section-title">Activated Schools</h2>
          {/* <Tabs>
            <TabList>
              <Tab>Activated Schools</Tab>
              <Tab>Claimed Schools</Tab>
            </TabList>
            <TabPanels>
              <TabPanel> */}
                <div className="schools-grid">
                  {fetching ? (
                    <CardSkeleton count={4} />
                  ) : (
                    <>
                      {decodedShooldata?.slice(1, 5).map((school, index) => (
                        <div key={index} className="school-card">
                          <SchoolCard
                            key={school.id}
                            id={school.id}
                            schoolName={school.schoolName}
                            imageHash={school.image}
                            location={school.region}
                            minted={'MINTED'}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              {/* </TabPanel>
              <TabPanel>Claimed Schools</TabPanel>
            </TabPanels>
          </Tabs> */}
        </section>
      </div>
    </>
  );
}

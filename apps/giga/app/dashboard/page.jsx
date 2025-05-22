'use client';

import {
  Modal,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
} from '@carbon/react';
import { ConnectKitButton } from 'connectkit';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useAccount } from 'wagmi';
import SchoolCard from '../../components/schoolCard/SchoolCard';
import { Queries } from '../libs/graph-query';
import {
  Copy,
  TaskComplete,
  ArrowUpRight,
  ArrowRight,
} from '@carbon/icons-react';
import './_dashboard.scss';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const { address, isConnected, isConnecting } = useAccount();
  const router = useRouter();

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

  const handleClick = () => {
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

      {data?.collectorOwnedNft?.nfts && (
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h3>My Dashboard</h3>
            <h1 className="profile-name profile-border">
              {isConnecting ? (
                <p> Connecting...</p>
              ) : !isConnected ? (
                <p>Wallet not connected</p>
              ) : (
                <>
                  {address?.slice(0, 4) + '...' + address?.slice(35, 43)}
                  {copied ? (
                    <TaskComplete
                      size={24}
                      style={{
                        marginLeft: '4px',
                        cursor: 'pointer',
                        color: '#A8A8A8',
                      }}
                      title="Copied!"
                    />
                  ) : (
                    <Copy
                      size={20}
                      style={{
                        marginLeft: '4px',
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
          </div>
          <div className="dashboard-top-section">
            <section className="profile-section">
              <div className="profile-image-container">
                <Image
                  src={`https://ipfs.io/ipfs/${decodedShooldata?.[0]?.image}`}
                  alt="Profile avatar"
                  width={360}
                  height={359}
                  className="profile-image"
                />
              </div>
            </section>

            {/* Latest School Reservation */}
            <section className="latest-reservation">
              <div className="reservation-info">
                <span className="reservation-label">
                  Latest School Activated
                </span>
              </div>
              <div className="reservation-info">
                <span className="reservation-label-header">
                  {decodedShooldata?.[0]?.schoolName}
                </span>
              </div>
              <div className="reservation-info">
                <span className="reservation-label-header-second">
                  {decodedShooldata?.[0]?.schoolType}
                </span>
              </div>
              <div className="reservation-info">
                <span className="reservation-label-header-link">
                  <span> {decodedShooldata?.[0]?.country} </span>
                  {/* <span className="color-link"> Locate on map </span> */}
                  {/* <span className="color-icon">
                  <ArrowUpRight size="18" />
                </span> */}
                </span>
              </div>

              <div className="dashboard-button">
                <Button renderIcon={ArrowRight}>View Details</Button>
              </div>
            </section>
          </div>
          {/* Reserved Schools Section */}
          <section className="reserved-schools-section">
            <h2 className="section-title">My Schools</h2>
            <div className="schools-grid">
              {fetching ? (
                <CardSkeleton count={4} />
              ) : (
                <>
                  {decodedShooldata?.map((school, index) => (
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
          </section>
        </div>
      )}

      {/* Not activated page */}
      {!fetching && !data?.collectorOwnedNft?.nfts && (
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h3>My Dashboard</h3>
            <h1 className="profile-name profile-border">
              {isConnecting ? (
                <p> Connecting...</p>
              ) : !isConnected ? (
                <p>Wallet not connected</p>
              ) : (
                <>
                  {address?.slice(0, 4) + '...' + address?.slice(35, 43)}
                  {copied ? (
                    <TaskComplete
                      size={24}
                      style={{
                        marginLeft: '4px',
                        cursor: 'pointer',
                        color: '#A8A8A8',
                      }}
                      title="Copied!"
                    />
                  ) : (
                    <Copy
                      size={20}
                      style={{
                        marginLeft: '4px',
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
          </div>
          <div
            style={{
              backgroundColor: '#F4F4F4',
              padding: '16px',
              borderRadius: '16px',
            }}
          >
            <div className="dashboard-top-section-unactivate">
              <section className="profile-section-unactivate">
                <div className="profile-image-container-unactivate">
                  <Image
                    src={'/images/unactivate-dashboard.png'}
                    alt="Profile avatar"
                    width={360}
                    height={359}
                    className="profile-image-unactivate"
                  />
                </div>
              </section>

              {/* Latest School Reservation */}
              <section className="latest-reservation-unactivate">
                <div className="reservation-info-unactivate">
                  <span className="reservation-label-header-unactivate">
                    You haven’t activated any schools yet.
                  </span>
                </div>
                <div className="reservation-info-unactivate">
                  <span className="reservation-label-unactivate-top">
                    Go ahead and find a school to activate. It’s only few clicks
                    away.
                  </span>
                  <span className="reservation-label-unactivate">
                    Once a school is activated it’ll appear in your collection
                  </span>
                </div>

                <div className="dashboard-button-unactivate">
                  <Button renderIcon={ArrowRight} onClick={handleClick}>
                    Activate Schools
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
      {
        fetching && <CardSkeleton count={4}/>
      }


    </>
  );
}

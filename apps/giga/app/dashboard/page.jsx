'use client';

import Image from 'next/image';
import './_dashboard.scss';
import { userData } from './mockData';
import { useQuery } from 'urql';
import { Queries } from '../libs/graph-query';
import { useAccount } from 'wagmi';
import { Modal, Button } from '@carbon/react';
import { ConnectKitButton } from 'connectkit';
import SchoolCard from '../../components/schoolCard/SchoolCard';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const { address, isConnected, isConnecting } = useAccount();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      setShowModal(true);
    } else if (isConnected) {
      setShowModal(false);
    }
  }, [isConnected, isConnecting]);

  const [result] = useQuery({
    query: Queries.schoolOwnedNftsQuery,
    variables: { id: '0xb87ab8d261771a575740fe314e4eaa41e511a000' },
  });

  const { data, fetching } = result;

  const decodedShooldata = data?.schoolOwnedNft?.nfts
    ?.map((d) => {
      try {
        const decoded = atob(d?.tokenUri?.substring(29));
        return JSON.parse(decoded);
      } catch (e) {
        console.error('Failed to decode tokenUri', e);
        return null;
      }
    })
    .filter(Boolean);
  console.log('isConnecting', isConnecting);

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
                src={userData.profileImage || '/placeholder.svg'}
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
                address?.slice(0, 4) + '...' + address?.slice(35, 43)
              )}
            </h1>
          </section>

          {/* Latest School Reservation */}
          <section className="latest-reservation">
            <div className="reservation-card">
              <div className="reservation-info">
                <span className="reservation-label">
                  Latest School Reservation
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
                      Fetching latest reservation
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
          <h2 className="section-title">Reserved Schools</h2>

          <div className="schools-grid">
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
          </div>
        </section>
      </div>
    </>
  );
}

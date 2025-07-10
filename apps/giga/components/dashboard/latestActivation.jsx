// components/LatestActivatedSchool/LatestActivatedSchool.jsx
'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

export default function LatestActivatedSchool({ decodedShooldata }) {
  const router = useRouter(); 
  const handleClick = () => {
    router.push(`/schools/${decodedShooldata?.[0]?.gigaSchoolId}`);
  };

  return (
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

      <section className="latest-reservation">
        <div className="reservation-info">
          <span className="reservation-label">Latest School Activated</span>
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
          </span>
        </div>

        <div className="dashboard-button">
          <Button renderIcon={ArrowRight} onClick={handleClick}>View Details</Button>
        </div>
      </section>
    </div>
  );
}
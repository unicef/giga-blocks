// components/NotActivatedContent/NotActivatedContent.jsx
'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

export default function NotActivatedContent({ handleClick }) {
  return (
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

        <section className="latest-reservation-unactivate">
          <div className="reservation-info-unactivate">
            <span className="reservation-label-header-unactivate">
              You haven’t activated any schools yet.
            </span>
          </div>
          <div className="reservation-info-unactivate">
            <span className="reservation-label-unactivate-top">
              Go ahead and find a school to activate. It’s only few clicks away.
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
  );
}
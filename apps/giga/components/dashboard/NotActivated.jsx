'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useEffect, useState } from 'react';

export default function NotActivatedContent({ handleClick }) {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on client-side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        boxShadow: '0 4px 60px #00000014',
        padding: '16px',
        borderRadius: '16px',
      }}
    >
      <div className="dashboard-top-section-unactivate">
        <section
          className="profile-section-unactivate"
          style={{ order: isMobile ? 2 : 1 }}
        >
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

        <section
          className="latest-reservation-unactivate"
          style={{ order: isMobile ? 1 : 2 }}
        >
          <div className="reservation-info-unactivate">
            <span className="reservation-label-header-unactivate">
              You haven't activated any schools yet.
            </span>
          </div>
          <div className="reservation-info-unactivate">
            <span className="reservation-label-unactivate-top">
              Go ahead and find a school to activate. It's only few clicks away.
            </span>
            <span className="reservation-label-unactivate">
              Once a school is activated it'll appear in your collection
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

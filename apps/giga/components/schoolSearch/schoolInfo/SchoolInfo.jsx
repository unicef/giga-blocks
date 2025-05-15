'use client';

import {
  ArrowUpRight,
  CheckmarkOutline,
  Renew,
  Wallet,
} from '@carbon/icons-react';
import Image from 'next/image';
import './_schoolInfo.scss';

export default function SchoolsInfo() {
  return (
    <div className="schools-info">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Every activated school gains a permanent seat on the blockchain,
              one step closer to reliable internet access.
            </h1>
            <p className="hero-subtitle">
              Found a school close to your heart? Activate it now to secure its
              future.
            </p>
          </div>
          <div className="hero-image">
            <Image
              src="/images/blue-banner.png"
              alt="World map showing school locations"
              width={400}
              height={250}
              className="map-image"
            />
          </div>
        </div>
      </section>

      <section className="activation-guide">
        <h2 className="school-section-title">How to Activate a school?</h2>
        <p className="description-text">
          Go ahead, find a school and mint its NFT. It’s never been easier to
          make a lasting impact
        </p>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon" style={{ backgroundColor: '#fae8ff' }}>
              <ArrowUpRight size={24} style={{ color: '#d946ef' }} />
            </div>
            <div className="step-number">1</div>
            <p className="step-label">Click 'Activate'</p>
          </div>

          <div className="step-card">
            <div className="step-icon" style={{ backgroundColor: '#fff7ed' }}>
              <Wallet size={24} style={{ color: '#f97316' }} />
            </div>
            <div className="step-number">2</div>
            <p className="step-label">Connect your wallet</p>
          </div>

          <div className="step-card">
            <div className="step-icon" style={{ backgroundColor: '#f3e8ff' }}>
              <CheckmarkOutline size={24} style={{ color: '#a855f7' }} />
            </div>
            <div className="step-number">3</div>
            <p className="step-label">Confirm Transaction</p>
          </div>

          <div className="step-card">
            <div className="step-icon" style={{ backgroundColor: '#eff6ff' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: '#3b82f6' }}
              >
                <path
                  d="M3 21h18v-3H3v3zm9-14h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2zM3 7h6c0 1.66-1.34 3-3 3S3 8.66 3 7zm0 4h6c0 1.66-1.34 3-3 3s-3-1.34-3-3zm0 4h6c0 1.66-1.34 3-3 3s-3-1.34-3-3z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="step-number">4</div>
            <p className="step-label">School Activated</p>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { ArrowUpRight, CheckmarkOutline, Wallet } from '@carbon/icons-react';
import Image from 'next/image';
import './_schoolInfo.scss';
import CtaSection from '../../CtaSection';
import LatestSchool from '../latestSchool/latestSchool';

export default function SchoolsInfo() {
  return (
    <div className="schools-info">
      <LatestSchool/>
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
        <div className="activation-content">
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
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F62FE"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-school-icon lucide-school"
                >
                  <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
                  <path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10" />
                  <path d="M18 5v17" />
                  <path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6" />
                  <path d="M6 5v17" />
                  <circle cx="12" cy="9" r="2" />
                </svg>
              </div>
              <div className="step-number">4</div>
              <p className="step-label">School Activated</p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <CtaSection
          title={`Be a part of a bigger initiative. Activate a school today.`}
        />
      </section>
    </div>
  );
}

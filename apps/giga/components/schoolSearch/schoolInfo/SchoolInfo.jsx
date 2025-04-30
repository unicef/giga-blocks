'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import {
  ArrowRight,
  ArrowUpRight,
  Wallet,
  Renew,
  CheckmarkOutline,
} from '@carbon/icons-react';
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
              src="/images/world-map.png"
              alt="World map showing school locations"
              width={400}
              height={250}
              className="map-image"
            />
          </div>
        </div>
      </section>

      <section className="activation-guide">
        <h2 className="section-title">How to Activate a school?</h2>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">
              <ArrowUpRight size={24} />
            </div>
            <p className="step-label">Click 'Activate'</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <Wallet size={24} />
            </div>
            <p className="step-label">Connect your wallet</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <Renew size={24} />
            </div>
            <p className="step-label">Confirm Transaction</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <CheckmarkOutline size={24} />
            </div>
            <p className="step-label">School Activated</p>
          </div>
        </div>

        <p className="description-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Go ahead, find a school and mint its NFT.
            <br /> It's never been easier to make a lasting impact
          </h2>
          <Button
            className="cta-button"
            renderIcon={ArrowRight}
            onClick={() => (window.location.href = '/schools/list')}
          >
            Activate a school
          </Button>
        </div>
      </section>
    </div>
  );
}

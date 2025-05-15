'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import './_landingBanner.scss';

export default function LandingBanner() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            We Are Building the <br /> World's Largest
            <br /> Decentralized School Database - Together
          </h1>
          <p className="hero-description">
            Support Giga's Mission. Help us connect every school and provide
            every student with access to
            <br /> information, opportunity and choice by activating schools and
            putting their data on-chain, forever.
          </p>
          <div className="hero-cta">
            <Link href="/schools/activate">
              <Button className="hero-button" renderIcon={ArrowRight}>
                Activate a school
              </Button>
            </Link>
          </div>
        </div>

        <div className="hero-illustration">
          <Image
            src="/images/hero-illustration.png"
            alt="Illustration of a person carrying data"
            width={400}
            height={450}
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import './_landingBanner.scss';
import { useRouter } from 'next/navigation';

export default function LandingBanner() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/schools/list?minted=NOTMINTED');

    setTimeout(() => {
      const element = document.getElementById('search');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="row">
          <div className="column col-lg-7">
            <div className="hero-content">
              <h1 className="hero-title">
                We Are Building the <br /> World's Largest
                <br /> Decentralized School Database - Together
              </h1>
              <p className="hero-description">
                Support Giga's Mission. Help us connect every school and provide
                every student with access to
                <br /> information, opportunity and choice by activating schools
                and putting their data on-chain, forever.
              </p>
              <div className="hero-cta">
                <Button onClick={handleClick} renderIcon={ArrowRight}>
                  Activate a school
                </Button>
              </div>
            </div>
          </div>

          <div className="column col-lg-5">
            <div className="hero-illustration">
              <Image
                src="/images/hero-illustration.svg"
                alt="Illustration of a person carrying data"
                width={600}
                height={530}
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

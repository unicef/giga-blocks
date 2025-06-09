'use client';

import { Button, Column, Grid, Row, TextInput } from '@carbon/react';
import { Search, ArrowRight } from '@carbon/icons-react';
import './_landingBanner.scss';
import React, { useState } from 'react';
import CarbonButton from '../carbonButton';
import { useRouter } from 'next/navigation';

export default function LandingBanner() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  // return (
  //   <CarbonButton icon={ArrowRight} kind="primary">
  //     About GigaBlocks
  //   </CarbonButton>
  // );

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/schools?name=${encodeURIComponent(searchValue)}`);
    } else {
      //need to add a toast or alert
      console.log('Please enter a school name to search.');
    }
  };
  return (
    <div className="hero-section">
      <Grid>
        <Column lg={8} md={8} sm={4} className="hero-content">
          <h1 className="hero-title">
            <span>We Are Building the</span> <span>World's Largest</span>{' '}
            <span>Decentralized School</span> <span>Database - Together</span>
          </h1>

          <p className="hero-description">
            Support Giga's Mission. Help us connect every school and provide
            every student with access to information, opportunity and choice by
            activating schools and putting their data on-chain, forever.
          </p>

          <div className="search-container">
            <TextInput
              id="search-school"
              labelText=""
              placeholder="Search School"
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="button-group">
            <Button
              onClick={handleSearch}
              kind="primary"
              className="responsive-button"
              renderIcon={Search}
            >
              Search
            </Button>

            <Button
              href="/about"
              kind="secondary"
              renderIcon={ArrowRight}
              className="responsive-button"
            >
              About GigaBlocks
            </Button>
            {/* <CarbonButton icon={ArrowRight} kind="primary">
              About GigaBlocks
            </CarbonButton> */}
          </div>
        </Column>

        <Column
          lg={8}
          md={8}
          sm={4}
          className="grid-pattern-container"
        ></Column>
      </Grid>
    </div>
  );
}

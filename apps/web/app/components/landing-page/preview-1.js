import React from 'react';
import { Button, Grid, Column } from '@carbon/react';
import { DirectionStraightRight } from '@carbon/icons-react';

const LandingPage = () => {
  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={8} md={8} sm={4} className="landing-page__banner">
        <p className="landing-subheading">Welcome to NFT 2.0</p>
        <h1 className="">
          The World’s Largest
          <br />{' '}
          <span style={{ color: '#277aff' }}>Decentralized Databases </span>
          <br />
          of Schools
        </h1>
        <p className="landing-subheading">
          Tap into the world's first open-source on-chain school database. Build
          transformative applications, utilize a unique dataset, and lead the
          way in decentralized Public Infrastructure Technology.
        </p>
        <div className="landing-page__buttons">
          <Button
            className="button-outline preview-1-button"
            href="/contributeSchool"
          >
            <span>Explore School Data</span>
            <span>
              <DirectionStraightRight />
            </span>
          </Button>
          <Button
            className="button-block preview-1-button"
            href="#joinCommunityForm"
          >
            <span>Get Involved </span>
            <span>
              <DirectionStraightRight />
            </span>
          </Button>
        </div>
      </Column>
      <Column md={4} lg={8} sm={4}>
        <img
          className="landing-page__illo"
          src="/landingPage/preview-1.png"
          alt="What is nft image"
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </Column>
    </Grid>
  );
};

export default LandingPage;

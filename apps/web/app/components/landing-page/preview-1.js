import React from 'react';
import { Button, Grid, Column } from '@carbon/react';
import { DirectionStraightRight } from '@carbon/icons-react';

const LandingPage = () => {
  return (
    <Grid className="landing-page preview1Background" fullWidth>
      <Column lg={8} md={8} sm={4} className="landing-page__banner">
        <p className="landing-subheading" style={{ fontFamily: 'lora' }}>
          Welcome to NFT 2.0
        </p>
        <h1 className="landing-page__heading">
          The World’s Largest Decentralized Databases of Schools
        </h1>
        <p className="landing-subheading">
          Tap into the world's first open-source on-chain school database. Build
          transformative applications, utilize a unique dataset, and lead the
          way in decentralized Public Infrastructure Technology.
        </p>
        <div className="landing-page__buttons">
          <Button className="button-block preview-1-button" href="/school">
            <span>Explore School Data</span>
            <span>
              <DirectionStraightRight />
            </span>
          </Button>
          <Button className="button-outline preview-1-button" href="#form">
            <span>Get Involved</span>
            <span>
              <DirectionStraightRight />
            </span>
          </Button>
        </div>
      </Column>
    </Grid>
  );
};

export default LandingPage;

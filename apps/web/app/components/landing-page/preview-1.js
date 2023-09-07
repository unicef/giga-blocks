import React from "react";
import { Button, Grid, Column } from "@carbon/react";
import { DirectionStraightRight } from "@carbon/icons-react";

const LandingPage = () => {
  return (
    <Grid className="landing-page preview1Background" fullWidth>
      <Column lg={8} md={8} sm={4} className="landing-page__banner">
        <p className="landing-subheading">Welcome to NFT 2.0</p>
        <h1 className="landing-page__heading">
          The World’s Largest Decentralized Databases of Schools
        </h1>
        <p className="landing-subheading">
          Join the Revolution to build the world’s first decentralized school
          database and empower students worldwide to participate in the future.
          Earn rewards, and Shape the Future of Learing Worldwide!
        </p>
        <div className="landing-page__buttons">
          <Button className="button-block preview-1-button" href="/school">
            <span>View Schools</span>
            <span>
              <DirectionStraightRight />
            </span>
          </Button>
          <Button className="button-outline preview-1-button" href="#form">
            <span>Sign Up</span>
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

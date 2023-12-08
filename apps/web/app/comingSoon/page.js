'use client';
import React from 'react';
import Navbar from '../components/navbar';
import { Button, Column, Grid } from '@carbon/react';
import { Tile } from '@carbon/react';
import './comingSoon.scss';
import { useRouter } from 'next/navigation';

const ComingSoon = () => {
  const route = useRouter();
  const handleClick = () => {
    route.push('/');
  };
  return (
    <>
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>Coming Soon !!!</h1>
            <Button onClick={handleClick}>Go Back To Home</Button>
          </Tile>
        </Column>
      </Grid>
    </>
  );
};

export default ComingSoon;

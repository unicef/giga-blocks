import { Column, Grid } from '@carbon/react';
import React from 'react';
import './styles/preview.scss';
import Card from '../reuseable/card';

const DigitalRevolution = () => {
  return (
    <>
      <Grid className="mp-0" fullWidth>
        <Column
          md={4}
          lg={7}
          sm={4}
          className="heading-col landing-page__tab-content"
        >
          <div className="preview-2-paragraph">
            <h1 className="heading12" style={{ width: '100%' }}>
              Developers,
              <br /> Let’s Shape the Digital Future of Education
            </h1>
            <p className="heading3">
              The future is digital, and we're here to make sure every child is
              part of it. Join us in the NFT2 initiative and play your role in
              shaping the global educational landscape. Be a driver of change,
              an advocate for connectivity, and a visionary for a better
              tomorrow.
            </p>
          </div>
        </Column>
        <Column
          md={4}
          lg={{ span: 16, offset: 7 }}
          sm={4}
          className="digital-revolution-img"
        >
          <img className="landing-page__illo" src="/Group.png" alt="landing" />
          <div
            style={{ position: 'absolute', top: '0', right: '0', width: '50%' }}
          >
            <Card
              title={'Dive into the data.'}
              description={'Start developing today  →'}
              dark
            />
          </div>
        </Column>
      </Grid>
    </>
  );
};

export default DigitalRevolution;

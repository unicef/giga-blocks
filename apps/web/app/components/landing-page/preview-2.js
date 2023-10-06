import { Grid, Column } from '@carbon/react';
import './styles/preview.scss';
import React from 'react';

const Preview2 = () => {
  return (
    <Grid className="preview-2" fullWidth>
      <Column
        md={4}
        lg={7}
        sm={4}
        className=" content landing-page__tab-content"
      >
        <div
          style={{
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            gap: '3vh',
          }}
        >
          <h2 className="heading8"> What is NFT 2.0?</h2>
          <p className="heading2">
            Envision a global developer community accessing and building upon a
            distributed school data repository. Each data point captures a
            school's unique narrative. With this resource, you can drive
            innovation, bridge the digital knowledge gap, and enable global
            access to quality education resources.
          </p>
        </div>
      </Column>
      <Column
        md={4}
        lg={{ span: 16, offset: 7 }}
        sm={4}
        style={{ background: 'gray' }}
      >
        <img
          className="landing-page__illo"
          src="/landingPage/preview-2/preview-2-img.png"
          alt="What is nft image"
          style={{ height: '400px', width: '100%', objectFit: 'cover' }}
        />
      </Column>
    </Grid>
  );
};

export default Preview2;

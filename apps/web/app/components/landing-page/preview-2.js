import { Grid, Column } from '@carbon/react';
import './styles/preview.scss';
import React from 'react';
import { ArrowDown } from '@carbon/icons-react';

const Preview2 = () => {
  return (
    <Grid className="preview-2" fullWidth>
      <Column md={4} lg={12} sm={4}>
        <div
          style={{
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <p className="heading02">
            Envision a global developer community accessing and building upon a
            distributed school data repository. Each data point captures a
            school's unique narrative. With this resource, you can drive
            innovation, bridge the digital knowledge gap, and enable global
            access to quality education resources.
          </p>
          <ArrowDown size={28} />
        </div>
      </Column>
    </Grid>
  );
};

export default Preview2;

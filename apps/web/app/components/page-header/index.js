'use client';
import { Grid, Column } from '@carbon/react';
import '../table/datatable.scss';

const PageHeader = ({ name }) => {
  return (
    <>
      <Grid className="preview1Background">
        <Column sm={16} md={10} lg={6} className="centerColumn">
          <Grid>
            <Column sm={16} md={10} lg={6}>
              <h1 className="heading8" style={{ marginBottom: '16px' }}>
                {name}
              </h1>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </>
  );
};

export default PageHeader;

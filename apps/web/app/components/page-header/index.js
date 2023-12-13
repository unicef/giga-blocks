'use client';
import { Grid, Column, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import '../table/datatable.scss';

const PageHeader = ({ name, breadcrumbs }) => {
  return (
    <>
      <div className="preview1Background">
        <Column sm={16} md={10} lg={16} className="centerColumn">
          <Grid>
            <Column sm={16} md={10} lg={16}>
              <Breadcrumb style={{ marginTop: '32px' }}>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem key={index} href={breadcrumb.link}>
                    {breadcrumb.text}
                  </BreadcrumbItem>
                ))}
                <BreadcrumbItem isCurrentPage>
                  <p style={{ color: 'white' }}>{name}</p>
                </BreadcrumbItem>
              </Breadcrumb>
              <h1
                className="heading8"
                style={{ marginBottom: '16px', marginTop: '32px' }}
              >
                {name}
              </h1>
            </Column>
          </Grid>
        </Column>
      </div>
    </>
  );
};

export default PageHeader;

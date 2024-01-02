'use client';
import { Grid, Column, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import './header.scss';
import '../table/datatable.scss';

const PageHeader = ({ name, breadcrumbs }) => {
  return (
    <>
      <div className="headerBackground">
        <Grid>
          <Column sm={8} md={10} lg={16} style={{ marginTop: '32px' }}>
            <Breadcrumb>
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={index} href={breadcrumb.link}>
                  {breadcrumb.text}
                </BreadcrumbItem>
              ))}
              <BreadcrumbItem isCurrentPage>
                <p style={{ color: 'white' }}>{name}</p>
              </BreadcrumbItem>
            </Breadcrumb>
          </Column>
          <Column sm={4} md={10} lg={16}>
            <h1
              className="heading8"
              style={{ marginBottom: '16px', marginTop: '32px' }}
            >
              {name}
            </h1>
          </Column>
        </Grid>
      </div>
    </>
  );
};

export default PageHeader;

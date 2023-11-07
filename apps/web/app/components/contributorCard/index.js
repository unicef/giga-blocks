'use client';
import React from 'react';
import { ClickableTile, Column, Grid } from '@carbon/react';
import './contributorCard.scss';

const ContributorCard = ({ contributors }) => {
  return (
    <Grid fullWidth style={{ margin: '30px auto' }}>
      {contributors?.length > 0 ? (
        contributors?.map((contributor) => (
          <Column key={contributor.id} sm={4}>
            <ClickableTile
              className="card"
              href={``}
              style={{ background: 'transparent' }}
            >
              <div
                className="row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={contributor.avatarUrl || '/landingPage/gravatar.png'}
                  alt="SVG Image"
                  style={{
                    marginBottom: '16px',
                    borderRadius: '50%',
                    width: '50%',
                  }}
                />
                <h4>{contributor.name}</h4>
                <div>
                  <p className="heading2 text-left">
                    {contributor.contributionMode}
                  </p>
                </div>
                <div>
                  <h4 className="heading2 text-left">
                    {contributor.contributionCount}
                  </h4>
                </div>
              </div>
            </ClickableTile>
          </Column>
        ))
      ) : (
        <Column sm={4} md={8} lg={16}>
          <h1>No contributors yet.</h1>
        </Column>
      )}
    </Grid>
  );
};

export default ContributorCard;

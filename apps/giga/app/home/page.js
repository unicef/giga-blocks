'use client';

import { ArrowDown } from '@carbon/icons-react';
import { Column, Grid } from '@carbon/react';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [themeData, setThemeData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/theme')
      .then((res) => res.json())
      .then((data) => setThemeData(data));
  }, []);
  console.log('themeData', themeData);

  return (
    <Grid className="landing-page" fullWidth>
      {/* Banner Section */}
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <div className="landing-page__banner__content">
          <ArrowDown size={34} />
          <h4
            style={{
              backgroundColor: themeData.bgColor,
              color: themeData.fontColor,
              padding: '20px',
            }}
            className="landing-page__banner__heading">
            MAPPING SCHOOL CONNECTIVITY GLOBALLY
          </h4>
          <p className="landing-page__banner__description dynamic-theme">
            Project Connect aims to create a live map of all schools in the
            world and the status of their Internet connection. It is the data
            foundation for Giga, a UNICEF and ITU initiative to connect every
            school and every young person to information, opportunity, and
            choice.
          </p>
        </div>
      </Column>

      {/* Image Section */}
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <img className="landing-page__r2__image" src={'/girl.png'} alt="Girl" />
      </Column>
    </Grid>
  );
}

'use client';

import { Column, Form, Grid, Search } from '@carbon/react';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [themeData, setThemeData] = useState({});

  // useEffect(() => {
  //   fetch('http://localhost:8000/theme')
  //     .then((res) => res.json())
  //     .then((data) => setThemeData(data));
  // }, []);
  useEffect(() => {
    setThemeData({});
  }, []);

  return (
    <Grid className="landing-page" fullWidth>
      {/* Banner Section */}
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <div>
          <div className="landing-page__banner__content">
            <h1 className="landing-page__banner__heading">
              Customized the webpage for schools on the chain.
            </h1>
            <div className="landing-page__banner__search">
              <Form className="form" aria-label="form">
                <Search
                  className="searchbar"
                  size="lg"
                  id="search-1"
                  labelText="Search"
                  placeholder="Search your school"
                />
              </Form>
              <p>If you dont find your school, build the webpage atleast!</p>
            </div>
            <div className="landing-page__banner__description">
              <div>
                <h1>2M+</h1>
                <p>Schools</p>
              </div>
              <div>
                <h1>700K</h1>
                <p>Schools Activated</p>
              </div>
              <div>
                <h1>50K+</h1>
                <p>Schools Online</p>
              </div>
            </div>
          </div>
        </div>
        <div>Image</div>
      </Column>

      {/* Image Section */}
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <img className="landing-page__r2__image" src={'/girl.png'} alt="Girl" />
      </Column>
    </Grid>
  );
}

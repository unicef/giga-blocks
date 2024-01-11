import { Column, Grid } from '@carbon/react';
import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <>
      <Grid className="footer mp-0" fullWidth>
        <Column md={4} lg={6} sm={4}>
          <h2 style={{ marginBottom: '16px' }}>NFT 2.0</h2>
          <p>
            Together, we can reshape the narrative of education in <br /> the
            digital age. Join, collaborate, innovate.
          </p>
        </Column>
        <Column md={4} lg={3} sm={4}>
          <p className="footer-heading">USEFUL LINKS</p>
          <ul>
            <li>
              <a href="/comingSoon">Data Repository</a>
            </li>
            <li>
              <a href="/#joinCommunityForm">Develop with Us</a>
            </li>
            <li>
              <a href="/#faq">FAQ's</a>
            </li>
          </ul>
        </Column>
        <Column md={4} lg={3} sm={4}>
          <p className="footer-heading">TERMS</p>
          <ul>
            <li>
              <a href="/comingSoon">TOS</a>
            </li>
            <li>
              <a href="/comingSoon">Privacy Policy</a>
            </li>
            <li>
              <a href="/comingSoon">Refund Policy</a>
            </li>
          </ul>
        </Column>
        <Column md={4} lg={4} sm={4}>
          <h3 className="footer-heading" style={{ marginBottom: '20px' }}>
            STAY IN TOUCH
          </h3>
          <p>
            For more information about Giga please go to{' '}
            <a className="link" href="https://giga.global/">
              {' '}
              Giga Connect{' '}
            </a>
            or tweet us at{' '}
            <a className="link" href="https://twitter.com/Gigaglobal">
              @Gigaglobal
            </a>
            .
          </p>
        </Column>
      </Grid>
    </>
  );
};

export default Footer;

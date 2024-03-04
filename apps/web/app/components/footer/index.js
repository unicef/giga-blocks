import { Column, Grid } from '@carbon/react';
import React from 'react';
import './footer.scss';
import { UpToTop } from '@carbon/icons-react';
import scrollToTop from '../../utils/scrollToTop';

const Footer = () => {
  return (
    <>
      <Grid className="footer mp-0" fullWidth>
        <Column className="footer-logo" md={4} lg={6} sm={4}></Column>
        <Column md={4} lg={3} sm={4}>
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
          <p>
            For more information about Giga:
            <br />
            <a className="link" href="https://giga.global/">
              {' '}
              Gigaglobal{' '}
            </a>
            or tweet us at{' '}
            <a className="link" href="https://twitter.com/Gigaglobal">
              @Gigaglobal
            </a>
            .
          </p>
        </Column>
        <Grid className="footer-logo">
          <Column md={4} lg={8} sm={4}>
            <h2>Giga Blocks</h2>
          </Column>
          <Column md={4} lg={8} sm={4}>
            <div className="circle" onClick={scrollToTop}>
              <UpToTop />
            </div>
          </Column>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;

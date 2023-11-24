import { Column, Grid } from '@carbon/react';
import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <>
      <Grid className="footer mp-0" fullWidth>
        <Column md={4} lg={6} sm={4}>
          <img
            style={{ width: '20%', marginBottom: '20px' }}
            src="/Logos/giga-logo-white.png"
            alt="Giga Logo"
          />
          <p>
            Together, we can reshape the narrative of education in <br /> the
            digital age. Join, collaborate, innovate.
          </p>
        </Column>
        <Column md={4} lg={3} sm={4}>
          <p className="footer-heading">USEFUL LINKS</p>
          <ul>
            <li>
              <a href="/school">Data Repository</a>
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
              <a>TOS</a>
            </li>
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a>Refund Policy</a>
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

{
  /* <Grid className="footer grid" fullWidth>
  
  <Column sm={16} md={8} lg={4}>
    <p className="footer-heading">TERMS</p>
    <ul>
      <li>
        <a>TOS</a>
      </li>
      <li>
        <a>Privacy Policy</a>
      </li>
      <li>
        <a>Refund Policy</a>
      </li>
    </ul>
  </Column>
  <Column sm={16} md={8} lg={4}>
    
  </Column>
  <Column sm={16} md={16} lg={16}>
    <p className="copyright">© Giga NFT 2023. All rights reserved.</p>
  </Column>
</Grid>; */
}

'use client';

import Link from 'next/link';
import './_footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__column footer__column--brand">
          <Link href="/" className="footer__brand">
            Giga Blocks
          </Link>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Giga products</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link
                href="https://maps.giga.global/map"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Giga Maps
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://giga.global/isps/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Giga ISP
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://meter.giga.global/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Giga Meter
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Organization</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link
                href="https://giga.global/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Giga
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://www.unicef.org/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                UNICEF
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://www.itu.int/en/Pages/default.aspx"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ITU
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Resources</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link
                href="https://maps.giga.global/docs/explore-api"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data downloads &API
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://giga.global/stories/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Giga Blog
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://giga.global/contact-us/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__copyright">
        The database accessed through Giga Blocks is made available under the{' '}
        <a
          href="https://opendatacommons.org/licenses/odbl/1-0/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#A8A8A8' }}
        >
           Open Database License (ODbL) 
        </a>
        . Any rights in individual contents of the database are licensed under
        the Database Contents License (DbCL) . This website is licensed under 
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#A8A8A8' }}
        >
          CC BY 4.0 
        </a>
        .
      </p>
    </footer>
  );
}

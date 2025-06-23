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
              >
                Giga Maps
              </Link>
            </li>
            <li className="footer__item">
              <Link href="https://giga.global/isps/" className="footer__link">
                Giga ISP
              </Link>
            </li>
            <li className="footer__item">
              <Link href="https://meter.giga.global/" className="footer__link">
                Giga Meter
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Organization</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link href="https://giga.global/" className="footer__link">
                Giga
              </Link>
            </li>
            <li className="footer__item">
              <Link href="https://www.unicef.org/" className="footer__link">
                UNICEF
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://www.itu.int/en/Pages/default.aspx"
                className="footer__link"
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
              >
                Data downloads &API
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://giga.global/stories/"
                className="footer__link"
              >
                Giga Blog
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="https://giga.global/contact-us/"
                className="footer__link"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

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
              <Link href="/products/maps" className="footer__link">
                Giga Maps
              </Link>
            </li>
            <li className="footer__item">
              <Link href="/products/isp" className="footer__link">
                Giga ISP
              </Link>
            </li>
            <li className="footer__item">
              <Link href="/products/meter" className="footer__link">
                Giga Meter
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Organization</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link href="/organization/giga" className="footer__link">
                Giga
              </Link>
            </li>
            <li className="footer__item">
              <Link href="/organization/unicef" className="footer__link">
                UNICEF
              </Link>
            </li>
            <li className="footer__item">
              <Link href="/organization/itu" className="footer__link">
                ITU
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Resources</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link href="/resources/data" className="footer__link">
                Data downloads &API
              </Link>
            </li>
            <li className="footer__item">
              <Link href="/resources/blog" className="footer__link">
                Giga Blog
              </Link>
            </li>
            <li className="footer__item">
              <Link href="/resources/contact" className="footer__link">
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

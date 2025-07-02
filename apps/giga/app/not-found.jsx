'use client';

import Link from 'next/link';
import Image from 'next/image';
import './globals.scss';
import { Button } from '@carbon/react';

export default function Custom404() {
  return (
    <div className="notfound-container">
      <Image
        src="/images/not-found.svg"
        alt="page not found"
        width={150}
        height={150}
      />
      <h1 className="notfound-title">404</h1>
      <p className="notfound-subtitle">
        Captain, looks like we’ve reached a space-block
      </p>
      <Link href="/">
        <Button
          variant="outlined"
          color="inherit"
          style={{ borderRadius: '4px' }}
        >
          Go back to homepage
        </Button>
      </Link>
    </div>
  );
}

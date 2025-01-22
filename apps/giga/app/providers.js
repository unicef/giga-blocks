'use client';

import { Content, Theme } from '@carbon/react';

import Navbar from '../components/Navbar/Navbar';

export function Providers({ children }) {
  return (
    <div>
      <Theme theme="g100">
        <Navbar />
      </Theme>

      <Content>{children}</Content>
    </div>
  );
}

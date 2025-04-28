'use client';

import { useState, useEffect } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from '@carbon/react';
import { ConnectKitButton } from 'connectkit';
import Link from 'next/link';
import { useAccount } from 'wagmi';

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header className="navbar" aria-label="Giga">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />

          <HeaderName href="/" prefix="">
            Giga Blocks
          </HeaderName>

          <HeaderNavigation aria-label="Giga">
            <Link href="/schools" passHref legacyBehavior>
              <HeaderMenuItem>Schools</HeaderMenuItem>
            </Link>
            <Link href="/schools" passHref legacyBehavior>
              <HeaderMenuItem>About Us</HeaderMenuItem>
            </Link>
            <Link href="/schools" passHref legacyBehavior>
              <HeaderMenuItem>Blogs</HeaderMenuItem>
            </Link>
            <Link href="/schools" passHref legacyBehavior>
              <HeaderMenuItem>Join Us</HeaderMenuItem>
            </Link>
            {isConnected && (
              <Link href={'#'} passHref legacyBehavior>
                <HeaderMenuItem>Dashboard</HeaderMenuItem>
              </Link>
            )}
          </HeaderNavigation>

          {/* SIDENAV STARTS HERE */}
          {isClient && (
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <Link href="/schools" passHref legacyBehavior>
                    <HeaderMenuItem>Schools</HeaderMenuItem>
                  </Link>
                  <Link href="/schools" passHref legacyBehavior>
                    <HeaderMenuItem>Data Sharing</HeaderMenuItem>
                  </Link>
                  <Link href="/schools" passHref legacyBehavior>
                    <HeaderMenuItem>Media</HeaderMenuItem>
                  </Link>
                  <Link href="/schools" passHref legacyBehavior>
                    <HeaderMenuItem>Join Us</HeaderMenuItem>
                  </Link>
                  {isConnected && (
                    <Link href={'#'} passHref legacyBehavior>
                      <HeaderMenuItem>Dashboard</HeaderMenuItem>
                    </Link>
                  )}
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          )}
          {/* SIDENAV ENDS HERE */}

          <HeaderGlobalBar></HeaderGlobalBar>
          <div>{<ConnectKitButton />}</div>
        </Header>
      )}
    />
  );
};

export default Navbar;

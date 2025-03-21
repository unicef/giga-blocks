'use client';

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

const Navbar = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header className="navbar" aria-label="Giga">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="">PROJECT CONNECT</HeaderName>
        </Link>
        <HeaderNavigation aria-label="Giga">
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
        </HeaderNavigation>
        {/* SIDENAV STARTS HERE */}
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
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        {/* SIDENAV ENDS HERE */}
        <HeaderGlobalBar>
          {/* <HeaderGlobalAction aria-label="Notifications">
            <Notification size={20} />
          </HeaderGlobalAction> */}
        </HeaderGlobalBar>
        <div>
          <ConnectKitButton />
        </div>
      </Header>
    )}
  />
);

export default Navbar;

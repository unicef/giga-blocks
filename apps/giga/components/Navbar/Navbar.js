'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [wasSideNavExpanded, setWasSideNavExpanded] = useState(false); // Track previous state
  const sideNavRef = useRef(null);

  const { isConnected } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close side navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        setIsSideNavExpanded(false);
      }
    };

    if (isSideNavExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSideNavExpanded]);

  // Handle side navbar behavior on viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Save the current state before closing
        setWasSideNavExpanded(isSideNavExpanded);
        setIsSideNavExpanded(false);
      } else {
        // Restore the previous state when returning to mobile view
        setIsSideNavExpanded(wasSideNavExpanded);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSideNavExpanded, wasSideNavExpanded]);

  return (
    <HeaderContainer
      render={({}) => (
        <Header className="navbar" aria-label="Giga">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
            isActive={isSideNavExpanded}
          />

          <HeaderName href="/" prefix="">
            Giga Blocks
          </HeaderName>

          <HeaderNavigation aria-label="Giga">
            <Link href="/schools" passHref legacyBehavior>
              <HeaderMenuItem>Schools</HeaderMenuItem>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <HeaderMenuItem>About Us</HeaderMenuItem>
            </Link>
            <Link href="/#" passHref legacyBehavior>
              <HeaderMenuItem>Blogs</HeaderMenuItem>
            </Link>
            {isConnected && (
              <Link href={'/dashboard'} passHref legacyBehavior>
                <HeaderMenuItem>Dashboard</HeaderMenuItem>
              </Link>
            )}
          </HeaderNavigation>

          {/* SIDENAV STARTS HERE */}
          {isClient && (
            <SideNav
              ref={sideNavRef}
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <Link href="/schools" passHref legacyBehavior>
                    <HeaderMenuItem onClick={() => setIsSideNavExpanded(false)}>
                      Schools
                    </HeaderMenuItem>
                  </Link>
                  <Link href="/about" passHref legacyBehavior>
                    <HeaderMenuItem onClick={() => setIsSideNavExpanded(false)}>
                      About Us
                    </HeaderMenuItem>
                  </Link>
                  <Link href="/blog" passHref legacyBehavior>
                    <HeaderMenuItem onClick={() => setIsSideNavExpanded(false)}>
                      Blogs
                    </HeaderMenuItem>
                  </Link>
                  {isConnected && (
                    <Link href={'/dashboard'} passHref legacyBehavior>
                      <HeaderMenuItem
                        onClick={() => setIsSideNavExpanded(false)}
                      >
                        Dashboard
                      </HeaderMenuItem>
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

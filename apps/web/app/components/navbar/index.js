import React, { useState } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { Wallet } from '@carbon/react/icons';
import Web3Modal from '../../components/web3-modal';

import { Link } from 'next/link';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header>
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName as={Link} href="/" prefix="">
            NFT 2.0
          </HeaderName>
          <HeaderNavigation>
            <HeaderMenuItem as={Link} href="/school">
              School Data
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} href="/#involved">
              Develop With Us
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} href="/#faq">
              Developer FAQ's
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} href="/#form">
              Reach Out
            </HeaderMenuItem>
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem as={Link} href="/">
                  Home
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/school">
                  School Data
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/#involved">
                  Develop With Us
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/#faq">
                  Developer FAQ's
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/#form">
                  Reach Out
                </HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
            <a
              href="/signIn"
              style={{
                minWidth: '5rem',
                marginTop: '16px',
                cursor: 'pointer',
                color: '#000',
                textDecoration: 'none',
              }}
            >
              Sign In
            </a>
            <HeaderGlobalAction>
              <Wallet onClick={openModal} size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <Web3Modal isOpen={isModalOpen} onClose={closeModal} />
        </Header>
      )}
    />
  );
};

export default Navbar;

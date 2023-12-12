import React, { useEffect, useState } from 'react';
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
  Dropdown,
} from '@carbon/react';
import './navbar.scss';
import { Wallet } from '@carbon/react/icons';
import { metaMask } from '../../components/web3/connectors/metamask';
import { Default_Chain_Id } from '../../components/web3/connectors/network';
import { Link } from 'next/link';
import { useAppAuthContext } from '../../auth/JwtContext';
import { useWeb3React } from '@web3-react/core';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAppAuthContext();
  const { account } = useWeb3React();

  const options = [
    { id: 'option1', text: 'Dashboard', link: '/dashboard' },
    { id: 'option3', text: 'Logout' },
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    if (option.text === 'Logout') {
      logout();
      window.location.href = '/';
    } else {
      window.location.href = option.link;
    }

    // Close the dropdown
    setIsDropdownOpen(false);
  };

  useEffect(() => {}, [account]);

  const handleWalletLogin = async () => {
    await metaMask.activate(Default_Chain_Id);
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header
          classname="navbar"
          style={{ background: '#383838', color: 'white' }}
        >
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName as={Link} href="/" prefix="" style={{ color: 'white' }}>
            NFT 2.0
          </HeaderName>
          <HeaderNavigation style={{ background: '#383838', color: 'white' }}>
            <HeaderMenuItem
              as={Link}
              href="/contributeSchool"
              style={{ background: '#383838', color: 'white' }}
            >
              School Database
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              href="/explore"
              style={{ background: '#383838', color: 'white' }}
            >
              NFT Marketplace
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              href="/#joinCommunityForm"
              style={{ background: '#383838', color: 'white' }}
            >
              Develop With Us
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              href="/#faq"
              style={{ background: '#383838', color: 'white' }}
            >
              Developer FAQ
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              href="/#form"
              style={{ background: '#383838', color: 'white' }}
            >
              Connect
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
                <HeaderMenuItem as={Link} href="/contributeSchool">
                  School Database
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/explore">
                  NFT Marketplace
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/#involved">
                  Develop With Us
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/#faq">
                  Developer FAQ
                </HeaderMenuItem>
                <HeaderMenuItem as={Link} href="/#form">
                  Connect
                </HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'relative',
              }}
            >
              {isAuthenticated ? (
                <>
                  <img
                    src="/landingPage/gravatar.png"
                    alt="User Avatar"
                    onClick={handleDropdownToggle}
                    style={{
                      cursor: 'pointer',
                      width: '15%',
                      marginRight: '12px',
                    }}
                  />
                  {isDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '60%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#fff',
                        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                        padding: '10px',
                        width: '60%',
                      }}
                    >
                      {options.map((option, index) => (
                        <div
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          style={{
                            padding: '10px',
                            cursor: 'pointer',
                            borderBottom:
                              index < options.length - 1
                                ? '1px solid #ccc'
                                : 'none',
                          }}
                        >
                          {option.text}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <a
                    href="/signIn"
                    style={{
                      minWidth: '5rem',
                      cursor: 'pointer',
                      color: '#fff',
                      textDecoration: 'none',
                    }}
                  >
                    Sign In
                  </a>
                  <Wallet
                    onClick={handleWalletLogin}
                    style={{ marginRight: '14px', cursor: 'pointer' }}
                  />
                </>
              )}
            </div>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};

export default Navbar;

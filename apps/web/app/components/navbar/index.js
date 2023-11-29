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
  Dropdown,
} from '@carbon/react';

import { Link } from 'next/link';
import { useAppAuthContext } from '../../auth/JwtContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAppAuthContext();

  const options = [
    { id: 'option1', text: 'Dashboard', link: '/dashboard' },
    { id: 'option2', text: 'Edit Profile' },
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
            <HeaderMenuItem as={Link} href="/contributeSchool">
              School Database
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} href="/explore">
              NFT Marketplace
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} href="/#joinCommunityForm">
              Develop With Us
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} href="/#faq">
              Developer FAQ
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} href="/#form">
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
                <HeaderMenuItem as={Link} href="/school">
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
                <a
                  href="/signIn"
                  style={{
                    minWidth: '5rem',
                    cursor: 'pointer',
                    color: '#000',
                    textDecoration: 'none',
                  }}
                >
                  Sign In
                </a>
              )}
            </div>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};

export default Navbar;

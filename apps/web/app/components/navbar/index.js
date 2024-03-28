import React, { useEffect, useState } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  Theme,
} from '@carbon/react';
import './navbar.scss';
import { Link } from 'next/link';
import { useAppAuthContext } from '../../auth/JwtContext';
import { useWeb3React } from '@web3-react/core';
import { metaMaskLogin } from '../../utils/metaMaskUtils';
import { getCurrentUser } from '../../utils/sessionManager';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAppAuthContext();
  const [isAuthenticationChecked, setIsAuthenticationChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const options = [
    { id: 'option1', text: 'Dashboard', link: '/dashboard' },
    { id: 'option3', text: 'Logout' },
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedItem(option.id);
    if (option.text === 'Logout') {
      logout();
      window.location.href = '/';
    } else {
      window.location.href = option.link;
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setIsAuthenticationChecked(true);
  }, []);

  const currentUser = getCurrentUser();

  return (
    <Theme theme="g90">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <div>
            <Header
              className="navbar"
              aria-label="Header"
              style={{ background: '#383838', color: 'white' }}
            >
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName
                as={Link}
                href="/"
                prefix=""
                style={{ color: 'white' }}
              >
                Giga Blocks
              </HeaderName>
              <HeaderNavigation
                aria-label="Header"
                style={{ background: '#383838', color: 'white' }}
              >
                <HeaderMenuItem
                  as={Link}
                  href="/contributeSchool"
                  style={{
                    background: '#383838',
                    color: 'white',
                    fontSize: '12px',
                    textDecoration:
                      selectedItem === 'option1'
                        ? 'underline solid blue'
                        : 'none',
                  }}
                >
                  School Database
                </HeaderMenuItem>
                <HeaderMenuItem
                  as={Link}
                  href="/explore"
                  style={{
                    background: '#383838',
                    color: 'white',
                    fontSize: '12px',
                    textDecoration:
                      selectedItem === 'option2'
                        ? 'underline solid blue'
                        : 'none',
                  }}
                >
                  NFT Marketplace
                </HeaderMenuItem>
                <HeaderMenuItem
                  as={Link}
                  href="/#joinCommunityForm"
                  style={{
                    background: '#383838',
                    color: 'white',
                    fontSize: '12px',
                    textDecoration:
                      selectedItem === 'option3'
                        ? 'underline solid blue'
                        : 'none',
                  }}
                >
                  Develop With Us
                </HeaderMenuItem>
                <HeaderMenuItem
                  as={Link}
                  href="/#faq"
                  style={{
                    background: '#383838',
                    color: 'white',
                    fontSize: '12px',
                    textDecoration:
                      selectedItem === 'option4'
                        ? 'underline solid blue'
                        : 'none',
                  }}
                >
                  Developer FAQ
                </HeaderMenuItem>
              </HeaderNavigation>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem
                      style={{ fontSize: '12px' }}
                      as={Link}
                      href="/contributeSchool"
                    >
                      School Database
                    </HeaderMenuItem>
                    <HeaderMenuItem
                      style={{ fontSize: '12px' }}
                      as={Link}
                      href="/explore"
                    >
                      NFT Marketplace
                    </HeaderMenuItem>
                    <HeaderMenuItem
                      style={{ fontSize: '12px' }}
                      as={Link}
                      href="/#joinCommunityForm"
                    >
                      Develop With Us
                    </HeaderMenuItem>
                    <HeaderMenuItem
                      style={{ fontSize: '12px' }}
                      as={Link}
                      href="/#faq"
                    >
                      Developer FAQ
                    </HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              {isAuthenticationChecked && (
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
                        <a
                          href="/dashboard"
                          style={{
                            paddingRight: '12px',
                            fontSize: '12px',
                            color: 'white',
                            textDecoration: 'none',
                          }}
                        >
                          {currentUser?.name}
                        </a>
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
                              color: 'black',
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
                            fontSize: '14px',
                          }}
                        >
                          Sign In
                        </a>
                      </>
                    )}
                  </div>
                </HeaderGlobalBar>
              )}
            </Header>
          </div>
        )}
      />
    </Theme>
  );
};

export default Navbar;

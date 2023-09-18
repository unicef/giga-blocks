import React from "react";
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
} from "@carbon/react";
import { Switcher, Notification, UserAvatar } from "@carbon/react/icons";

import { Link } from "next/link";

const Navbar = () => (
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
            Schools
          </HeaderMenuItem>
          <HeaderMenuItem as={Link} href="/#involved">
            Get Involved
          </HeaderMenuItem>
          <HeaderMenuItem as={Link} href="/#faq">
            FAQ's
          </HeaderMenuItem>
          <HeaderMenuItem as={Link} href="/#form">
            Connect With Us
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
                Schools
              </HeaderMenuItem>
              <HeaderMenuItem as={Link} href="/#involved">
                Get Involved
              </HeaderMenuItem>
              <HeaderMenuItem as={Link} href="/#faq">
                FAQ's
              </HeaderMenuItem>
              <HeaderMenuItem as={Link} href="/#form">
                Connect With Us
              </HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar>
          <a
            href="/signUp"
            style={{
              minWidth: "5rem",
              marginTop: "16px",
              cursor: "pointer",
              color: "#000",
              textDecoration: "none",
            }}
          >
            Sign Up
          </a>
          <HeaderGlobalAction>
            <UserAvatar size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )}
  />
);

export default Navbar;

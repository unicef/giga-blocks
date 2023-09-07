import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from "@carbon/react";
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
      </Header>
    )}
  />
);

export default Navbar;

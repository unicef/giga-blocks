import { Grid, Column, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import '../dashboard.scss';

import { getCurrentUser } from '../../../utils/sessionManager';
import { useContributionCount } from '../../../hooks/useContributionList';

import { useWeb3React } from '@web3-react/core';
import { metaMaskLogout } from '../../../utils/metaMaskUtils';
import { useRouter } from 'next/navigation';

const Header = () => {
  const route = useRouter();
  const user = getCurrentUser();

  const disconnect = () => {
    metaMaskLogout();
  };

  return (
    <div className="dashboard-head-wrapper">
      <Grid fullWidth>
        <Column sm={8} md={10} lg={16} style={{ marginTop: '32px' }}>
          <Breadcrumb>
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem key={index} href={breadcrumb.link}>
                {breadcrumb.text}
              </BreadcrumbItem>
            ))}
            <BreadcrumbItem isCurrentPage>
              <p style={{ color: 'white' }}>{name}</p>
            </BreadcrumbItem>
          </Breadcrumb>
        </Column>
        <Column lg={16} md={8} sm={4} className="column">
          <div>
            <h2>{name}</h2>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            {!user?.walletAddress && account && (
              <>
                <p>
                  {account}{' '}
                  <a
                    style={{
                      cursor: 'pointer',
                      color: 'blue',
                      textDecoration: 'underline',
                    }}
                    onClick={disconnect}
                  >
                    Disconnect
                  </a>
                </p>
              </>
            )}
            {user?.walletAddress && (
              <p>
                {user?.walletAddress}
                <h6 style={{ color: 'blue' }}>
                  {account &&
                    user?.walletAddress?.toLowerCase() !==
                      account?.toLowerCase() && (
                      <a
                        style={{
                          cursor: 'pointer',
                          color: 'blue',
                          textDecoration: 'underline',
                        }}
                        onClick={disconnect}
                      >
                        {' '}
                        Connected to different account
                      </a>
                    )}{' '}
                  {!account && 'Not Connected'}
                </h6>
              </p>
            )}
          </div>
          <div className="sub-column-1">
            <p className="head">My Contributions</p>
            <div className="sub-column-2">
              <h1>{data?.meta?.total ?? 0} </h1>
              <div>
                <p>Contributions</p>
              </div>
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  );
};
export default Header;

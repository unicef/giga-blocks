import { Grid, Column, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import '../dashboard.scss';

import { getCurrentUser } from '../../../utils/sessionManager';
import { useContributionCount } from '../../../hooks/useContributionList';

const Header = ({ name, breadcrumbs }) => {
  const user = getCurrentUser();
  const { data } = useContributionCount(user?.id);
  return (
    <div className="dashboard-head-wrapper">
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4} className="column">
          <Breadcrumb style={{ marginBottom: '16px', display: 'flex' }}>
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
          <h2>My Dashboard</h2>
          <div className="sub-column-1">
            <p className="head">My Contributions</p>
            <div className="sub-column-2">
              <h1>{data?.meta?.total ?? 0} </h1>
              <div>
                <p>Contributions</p>
              </div>
            </div>
            <p className="foot">View history</p>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default Header;

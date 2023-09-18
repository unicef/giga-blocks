import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';

// layouts
import DashboardLayout from '@layouts/dashboard';
// components
import Iconify from '@components/iconify';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
// sections
import { AccountGeneral } from '../../sections/user/account';
// routes
// import { PATH_USER, PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

UserAccountPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    // {
    //   value: 'activity',
    //   label: 'My Activity',
    //   icon: <Iconify icon="lucide:activity" />,
    //   component: <AccountActivity />,
    // },
  ];

  return (
    <>
      <Head>
        {/* <title> User: Account Settings | LSO Partners</title> */}
      </Head>

      <Container>
        <CustomBreadcrumbs heading="Account Settings" />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}

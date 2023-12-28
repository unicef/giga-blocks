import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import UserProfileEditForm from '@sections/user/UserProfileEditForm';
import { PATH_DASHBOARD } from '@routes/paths';

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function UserEditPage() {
  const {
    query: { id },
  } = useRouter();

  return (
    <>
      <Head>
        <title> Giga: Profile Details </title>
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Container>
            <CustomBreadcrumbs
              heading="Profile"
              links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Profile' }]}
            />
            {id && <UserProfileEditForm id={id} />}
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

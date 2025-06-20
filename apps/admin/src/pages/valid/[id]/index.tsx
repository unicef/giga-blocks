import Head from 'next/head';
import { useRouter } from 'next/compat/router';
import { Grid } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import ValidateDetail from '@sections/user/list/ValidateDetail';
import { NextRouter } from 'next/router';

ContributePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function ContributePage() {
  const {
    query: { id },
  } = useRouter() as NextRouter;

  return (
    <>
      <Head>
        <title> School Details Page </title>
      </Head>

      <Grid container spacing={2} sm={12}>
        {id && <ValidateDetail id={id} />}
      </Grid>
    </>
  );
}

import Head from 'next/head';
import { useRouter } from 'next/compat/router';
import { Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import NftDetails from '@sections/user/NftDetails';
import { NextRouter } from 'next/router';

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function UserEditPage() {
  const {
    query: { id },
  } = useRouter() as NextRouter;

  return (
    <>
      <Head>
        <title> School Details Page </title>
      </Head>

      <Grid container spacing={2}>
        {id && <NftDetails id={id} />}
      </Grid>
    </>
  );
}

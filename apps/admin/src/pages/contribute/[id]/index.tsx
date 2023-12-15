import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import ContributeDetail from '@sections/user/ContributeDetails';


ContributePage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default function ContributePage() {
  const {
    query: { id },
  } = useRouter();
  
  return (
    <>
    <Head>
    <title> School Details Page </title>
    </Head>

    <Grid container spacing={2}>
    {id && <ContributeDetail id={id}/>}    
    </Grid>
    </>
  );
}

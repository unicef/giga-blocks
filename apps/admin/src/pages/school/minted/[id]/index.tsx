import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import SchoolDetails from './SchoolDetails';
import GraphQlProvider from 'src/libs/graphql-query-client';


UserEditPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default function UserEditPage() {
  const {
    query: { id },
  } = useRouter();

  const singleUser = "Admin"
  
  return (
    <>
    <Head>
    <title> School Details Page </title>
    </Head>
    <Grid container spacing={2}>
    <GraphQlProvider>
    {id && <SchoolDetails id={id}/>}    
    </GraphQlProvider>
    </Grid>
    </>
  );
}

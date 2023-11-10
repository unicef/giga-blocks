import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSchoolGetById } from '@hooks/school/useSchool';
import Image from 'next/image';
import ContributeDetail from '@sections/user/ContributeDetails';
import ValidateDetail from '@sections/user/list/ValidateDetail';


ContributePage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default function ContributePage() {
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
    {id && <ValidateDetail id={id}/>}    
    </Grid>
    </>
  );
}

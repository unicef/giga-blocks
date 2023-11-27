import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import SchoolDetails from '@sections/user/SchoolDetails';
import { useSchoolGetById } from '@hooks/school/useSchool';
import Image from 'next/image';
import NftDetails from '@sections/user/NftDetails';


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
    {id && <NftDetails id={id}/>}    
    </Grid>
    </>
  );
}

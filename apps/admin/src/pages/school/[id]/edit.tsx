import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import UserNewEditForm from '@sections/user/UserNewEditForm';
import { useSchoolGetById } from '@hooks/school/useSchool';
import Image from 'next/image';


UserEditPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default function UserEditPage() {
  const {
    query: { id },
  } = useRouter();

  const singleUser = "Admin"

//   const {data} = useSchoolGetById(id)

//   console.log(data)
  
  return (
    <>
    <Head>
    <title> School Details Page </title>
    </Head>

    <Grid container spacing={2}>
    <Grid item xs={8}>
    <Container>
        <CustomBreadcrumbs heading="School Detail Page" />
        <UserNewEditForm />
      </Container>
    </Grid>
    <Grid item xs={4}>
    <Container>
    <Box justifyContent={'center'}>
    <Image width={250} height={250} alt='USER' src={'/assets/Image-right.svg'}/>
    </Box>
    </Container>
    </Grid>      
    </Grid>
    </>
  );
}

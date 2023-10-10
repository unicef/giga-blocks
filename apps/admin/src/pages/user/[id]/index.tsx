import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import UserNewEditForm from '@sections/user/SchoolDetails';
import { useUserGetById } from '@hooks/user/useUser';
import Image from 'next/image';
import UserProfileEditForm from '@sections/user/UserProfileEditForm';


UserEditPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

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
        <CustomBreadcrumbs heading="My Profile" />
        {id && <UserProfileEditForm id={id}/>}
      </Container>
    </Grid>
    <Grid item xs={4}>
    <Container>
    {/* <Box 
    justifyContent={'center'}
    rowGap={2}
    columnGap={2}
    display="grid"
    >
    <Image width={250} height={250} alt='USER' src={'/assets/Image-right.svg'}/>
    <Button variant='outlined' color='inherit'>Update Profile</Button>
    <Button variant='outlined' color='inherit' style={{opacity: '0.7'}}>Remove Picture</Button>
    </Box> */}
    </Container>
    </Grid>      
    </Grid>
    </>
  );
}
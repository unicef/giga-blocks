// import { useEffect } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { Container } from '@mui/material';

// import DashboardLayout from '@layouts/dashboard';
// import CustomBreadcrumbs from '@components/custom-breadcrumbs';
// import UserNewEditForm from '@sections/user/UserNewEditForm';


// UserEditPage.getLayout = (page: React.ReactElement) => (
//     <DashboardLayout>{page}</DashboardLayout>
// );

// export default function UserEditPage() {
//   const {
//     query: { id },
//   } = useRouter();

//   const singleUser = "Admin"


//   return (
//     <>
//       <Head>
//         <title> User: Details | LSO Partners</title>
//       </Head>

//       <Container>
//         <CustomBreadcrumbs heading="User Details" />

//         <UserNewEditForm isEdit currentUser={singleUser} />
//       </Container>
//     </>
//   );
// }

'use client';
import AuthGuard from '../auth/AuthGuard';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Heading from '../components/school-detail/heading';
import Card from '../components/card';
import QueryProvider from '../libs/get-query-client';
import GarphQlProvider from '../libs/graphql-query-client';

const Dashboard = () => {
  return (
    <>
      <GarphQlProvider>
        <QueryProvider>
          <Navbar />
          <Heading />
          <Card />
          <Footer />
        </QueryProvider>
      </GarphQlProvider>
    </>
  );
};

export default Dashboard;

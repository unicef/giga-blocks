'use client';
import Navbar from '../components/navbar';
import Header from '../components/dashboard/header';
import Footer from '../components/footer';
import QueryProvider from '../libs/get-query-client';
import GarphQlProvider from '../libs/graphql-query-client';
import Tabs from '../components/dashboard/tab';

const Dashboard = () => {
  return (
    <>
      <GarphQlProvider>
        <QueryProvider>
          <Navbar />
          <Header />
          <Tabs/>
          <Footer />
        </QueryProvider>
      </GarphQlProvider>
    </>
  );
};

export default Dashboard;

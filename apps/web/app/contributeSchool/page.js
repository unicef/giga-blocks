'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';
import Card from '../components/contributeSchools';
import QueryProvider from '../libs/get-query-client';

const SchoolCard = () => {
  return (
    <QueryProvider>
      <Navbar />
      <PageHeader name={'Schools'} />
      <Card />
      <Footer />
    </QueryProvider>
  );
};

export default SchoolCard;

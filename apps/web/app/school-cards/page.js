'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';
import Card from '../components/card';
import QueryProvider from '../libs/get-query-client';

const SchoolCard = () => {
  return (
    <QueryProvider>
      <Navbar />
      <PageHeader />
      <Card />
      <Footer />
    </QueryProvider>
  );
};

export default SchoolCard;

'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';
import Card from '../components/contributeSchools';

const SchoolCard = () => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];
  return (
    <>
      <Navbar />
      <PageHeader name={'Schools'} breadcrumbs={breadcrumbs} />
      <Card />
      <Footer />
    </>
  );
};

export default SchoolCard;

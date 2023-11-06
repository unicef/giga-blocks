'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';
import ContributorCard from '../components/contributorCard';
const ContributorList = () => {
  return (
    <>
      <Navbar />
      <PageHeader name={'Contributor List'} />
      <ContributorCard />
      <Footer />
    </>
  );
};

export default ContributorList;

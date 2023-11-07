'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import ContributionTable from '../components/contributionTable';
import Heading from '../components/school-detail/heading';
import PageHeader from '../components/page-header';

const ContributionList = () => {
  return (
    <>
      <Navbar />
      <PageHeader name={'Contribution List'} />
      <ContributionTable />
      <Footer />
    </>
  );
};

export default ContributionList;

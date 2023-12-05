'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import ContributionTable from '../components/contributionTable';
import PageHeader from '../components/page-header';

const ContributionList = () => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  return (
    <>
      <Navbar />
      <PageHeader name={'Contribution List'} breadcrumbs={breadcrumbs} />
      <ContributionTable />
      <Footer />
    </>
  );
};

export default ContributionList;

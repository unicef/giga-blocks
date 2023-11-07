'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import ContributionTable from '../components/contributionTable';
import Heading from '../components/school-detail/heading';

const SchoolDetail = ({ id }) => {
  return (
    <>
      <Navbar />
      <Heading />
      <ContributionTable />
      <Footer />
    </>
  );
};

export default SchoolDetail;

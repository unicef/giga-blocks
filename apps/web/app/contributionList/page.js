'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import ContributionList from '../components/contributionList';
import Heading from '../components/school-detail/heading';

const SchoolDetail = ({ id }) => {
  return (
    <>
      <Navbar />
      <Heading />
      <ContributionList />
      <Footer />
    </>
  );
};

export default SchoolDetail;

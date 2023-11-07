'use client';
import Footer from '../../../components/footer';
import Navbar from '../../../components/navbar';
import Contribution from '../../../components/contribute';
import PageHeader from '../../../components/page-header';

const Contribute = () => {
  return (
    <>
      <>
        <Navbar />
        <PageHeader name={'Contribute Data'} />
        <Contribution />
        <Footer />
      </>
    </>
  );
};

export default Contribute;

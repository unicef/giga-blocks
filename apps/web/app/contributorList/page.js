'use client';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';
import ContributorCard from '../components/contributorCard';
import QueryProvider from '../libs/get-query-client';
import { useContributionList } from '../hooks/useContributorList';

const ContributorList = () => {
  const { data: contributors, isLoading } = useContributionList();
  return (
    <>
      <QueryProvider>
        <Navbar />
        <PageHeader name={'Contributor List'} />
        <ContributorCard contributors={contributors} isLoading={isLoading} />
        <Footer />
      </QueryProvider>
    </>
  );
};

export default ContributorList;

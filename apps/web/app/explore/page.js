'use client';
import { useState } from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';
import Card from '../components/card';
import QueryProvider from '../libs/get-query-client';
import GarphQlProvider from '../libs/graphql-query-client';
import { Queries } from '../libs/graph-query';

const SchoolCard = () => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  const [pageSize, setPageSize] = useState(8);
  const variables = { first: pageSize };
  return (
    <GarphQlProvider>
      <QueryProvider>
        <Navbar />
        <PageHeader name={'Explore NFT'} breadcrumbs={breadcrumbs} />
        <Card />
        <PageHeader name={'Schools'} />
        <Card
          query={Queries.nftListQuery}
          variables={variables}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        <Footer />
      </QueryProvider>
    </GarphQlProvider>
  );
};

export default SchoolCard;

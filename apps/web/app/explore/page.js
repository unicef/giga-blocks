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
  const [pageSize, setPageSize] = useState(8);
  const variables = { first: pageSize };
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  return (
    <GarphQlProvider>
      <QueryProvider>
        <Navbar />
        <PageHeader name={'Schools'} breadcrumbs={breadcrumbs} />
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

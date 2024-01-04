'use client';
import { useState } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/dashboard/header';
import Footer from '../components/footer';
import QueryProvider from '../libs/get-query-client';
import GarphQlProvider from '../libs/graphql-query-client';
import Tabs from '../components/dashboard/tab';
import OwnedNfts from '../components/card';
import { Queries } from '../libs/graph-query';
import { useWeb3React } from '@web3-react/core';
import PageHeader from '../components/page-header';
import ConnectWallet from '../components/connectWallet';

const Dashboard = () => {
  const {account} = useWeb3React();
  const [pageSize, setPageSize] = useState(8);
  const breadcrumbs = [
    { text: 'Home', link: '/' },
    { text: 'Dashboard', link: '/dashboard' },
  ];

  const variables = {
    id: account,
    first: pageSize,
  }
  return (
    <>
      <GarphQlProvider>
        <QueryProvider>
          <Navbar />
          <PageHeader name ={account?account:'MyNFT'} breadcrumbs={breadcrumbs} />
          {!account? (
            <div style={{marginTop:'80px', marginBottom:'90px'}}>
              <ConnectWallet />
            </div>
        ):
         ( 
         <div className="tabs-wrapper">
         <OwnedNfts 
            query={Queries.ownedNftsQuery}
            variables={variables}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setSearch={false}
          />
          </div>)
}
          <Footer />
        </QueryProvider>
      </GarphQlProvider>
    </>
  );
};

export default Dashboard;

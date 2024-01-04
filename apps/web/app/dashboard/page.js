'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/dashboard/header';
import Footer from '../components/footer';
import QueryProvider from '../libs/get-query-client';
import GarphQlProvider from '../libs/graphql-query-client';
import Tabs from '../components/dashboard/tab';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../utils/sessionManager';

const Dashboard = () => {
  const user = getCurrentUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push('/signIn');
    }
  }, [user]);
  const breadcrumbs = [
    { text: 'Home', link: '/' },
    { text: 'Dashboard', link: '/dashboard' },
  ];
  return (
    <>
      <GarphQlProvider>
        <QueryProvider>
          <Navbar />
          <Header breadcrumbs={breadcrumbs} />
          <Tabs />
          <Footer />
        </QueryProvider>
      </GarphQlProvider>
    </>
  );
};

export default Dashboard;

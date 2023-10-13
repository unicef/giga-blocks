"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";
import Card from "../components/card";
import QueryProvider from "../libs/get-query-client";
import GarphQlProvider from "../libs/graphql-query-client";
const SchoolCard = () => {
  return (
    <GarphQlProvider>
    <QueryProvider>
      <Navbar />
      <PageHeader />
      <Card />
      <Footer />
    </QueryProvider>
    </GarphQlProvider>
  );
};

export default SchoolCard;

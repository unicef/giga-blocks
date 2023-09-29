"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";
import Card from "../components/card";
import QueryProvider from "../libs/get-query-client";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";

const SchoolCard = () => {
  const apiKey = "08f9ad14d0cdff91f67dd3bb4c89e42f";
  const QueryURL = 'https://api.thegraph.com/subgraphs/name/myanzik/giga'

  const client = new Client({
    url: QueryURL,
    exchanges: [cacheExchange, fetchExchange],
  });
  return (
    <Provider value={client}>
    <QueryProvider>
      <Navbar />
      <PageHeader />
      <Card />
      <Footer />
    </QueryProvider>
    </Provider>
  );
};

export default SchoolCard;

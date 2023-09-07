"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";
import SchoolTable from "../components/table/datatable";
import DigitalRevolution from "../components/landing-page/digitalRevolution";
import "../components/table/datatable.scss";
import QueryProvider from "../libs/get-query-client";

const School = () => {
  const headerData = [
    {
      header: "Name of School",
      key: "name",
    },
    {
      header: "Country",
      key: "country",
    },
    {
      header: "Education Level",
      key: "education_level",
    },
    {
      header: "Internet connectivity",
      key: "connectivity_speed_status",
    },
  ];

  return (
    <QueryProvider>
      <Navbar />
      <PageHeader />
      <DigitalRevolution />
      <SchoolTable headerData={headerData} />
      <Footer />
    </QueryProvider>
  );
};

export default School;

'use client';
import React from 'react';
import Navbar from './components/navbar';
import RegistrationForm from './components/nftForm';
import Faq from './components/faq';
import Preview1 from './components/landing-page/preview-1';
import Footer from './components/footer';
import Preview2 from './components/landing-page/preview-2';
import WhyNFT2 from './components/landing-page/why-nft2';
import GetInvolved from './components/landing-page/get-involved';

export default function Home() {
  return (
    <>
      <Navbar />
      <Preview1 />
      <Preview2 />
      <WhyNFT2 />
      <GetInvolved />
      <RegistrationForm />
      <Faq />
      <Footer />
    </>
  );
}

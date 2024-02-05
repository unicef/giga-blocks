'use client';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Introduction from '../../components/school-detail/introduction';
import Connectivity from '../../components/school-detail/connectivity';
import TransactionHistory from '../../components/school-detail/transactionHistory';
import NFTMetadata from '../../components/school-detail/nftMetadata';
import { useQuery } from 'urql';
import { Queries } from '../../libs/graph-query';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loading } from '@carbon/react';
import PageHeader from '../../components/page-header';
import { useRouter } from 'next/navigation';


const SchoolDetail = ({ id }) => {
  const [result] = useQuery({
    query: Queries.nftDetailsQuery,
    variables: { id },
  });
  const { fetching } = result;
  const [schoolData, setSchoolData] = useState();

  const decodeSchooldata = (data) => {
    const encodeddata = data.collectorTokenUri;
    const decodedData = atob(encodeddata?.tokenUri.substring(29));
    const nftDetails = {
      owner: encodeddata.owner.id,
      ...JSON.parse(decodedData),
    };
    setSchoolData(nftDetails);
  };
  useEffect(() => {
    if (result.data) decodeSchooldata(result.data);
  }, [result.data]);

  const breadcrumbs = [
    { text: 'Home', link: '/' },
    { text: 'NFTMarketPlace', link: '/explore' },
  ];

  const route = useRouter();

  const handleClickRoute = () => {
    route.push('/viewMyNFT');
  };

  return (
    <>
      {fetching == false ? (
        <>
          <Navbar />
          <PageHeader name={schoolData?.schoolName} breadcrumbs={breadcrumbs} />
          <Introduction schooldata={schoolData} tokenId={id} />
          <Connectivity schoolData={schoolData} />
          <TransactionHistory schoolData={schoolData} />
          <NFTMetadata schoolData={schoolData} />
          <Footer />
        </>
      ) : (
        <div className="loader-container">
          {' '}
          <Loading withOverlay={false} />{' '}
          <span>Loading school data, please wait...</span>{' '}
        </div>
      )}
    </>
  );
};

export default SchoolDetail;

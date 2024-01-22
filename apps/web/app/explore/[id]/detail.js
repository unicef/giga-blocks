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

const SchoolDetail = ({ id }) => {
  const [result] = useQuery({
    query: Queries.nftDetailsQuery,
    variables: { id },
  });
  const { fetching } = result;
  const [schoolData, setSchoolData] = useState();
  const [noData, setNoData] = useState(false)

  const decodeSchooldata = (data) => {
    if(data?.collectorTokenUri != null) {
    const encodeddata = data.collectorTokenUri;
      const decodedData = atob(encodeddata?.tokenUri.substring(29));
      const nftDetails = {
        owner: encodeddata.owner.id,
        ...JSON.parse(decodedData),
      };
      setSchoolData(nftDetails);
      setNoData(false)
    }
    else{
    setNoData(true)
    }
  };
  useEffect(() => {
    if (result) decodeSchooldata(result.data);
  }, [result.data]);

  const breadcrumbs = [
    { text: 'Home', link: '/' },
    { text: 'NFTMarketPlace', link: '/explore' },
  ];

  return (
    <>
      {fetching == true ? (
        <div className="loader-container">
        {' '}
        <Loading withOverlay={false} />{' '}
        <span>Loading school data, please wait...</span>{' '}
      </div>
        
      ) : noData === true ? <div className="loader-container">
      {' '}
      <h3>No school data with such ID.</h3>{' '}
    </div> : (
        <>
          <Navbar />
          <PageHeader name={schoolData?.schoolName} breadcrumbs={breadcrumbs} />
          <Introduction schooldata={schoolData} tokenId={id} />
          <Connectivity schoolData={schoolData} />
          <TransactionHistory schoolData={schoolData} />
          <NFTMetadata schoolData={schoolData} />
          <Footer />
        </>
      )}
    </>
  );
};

export default SchoolDetail;

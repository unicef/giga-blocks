'use client';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Introduction from '../../components/school-detail/introduction';
import Connectivity from '../../components/school-detail/connectivity';
import Heading from '../../components/school-detail/heading';
import { useQuery } from 'urql';
import { Queries } from '../../libs/graph-query';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loading } from '@carbon/react';

const SchoolDetail = () => {
  const [result] = useQuery({
    query: Queries.nftDetailsQuery,
    variables: { id: 1 },
  });
  const { fetching } = result;
  const [schoolData, setSchoolData] = useState();

  const decodeSchooldata = (data) => {
    const encodeddata = data.tokenUri;
    const decodedData = atob(encodeddata.tokenUri.substring(29));
    setSchoolData(JSON.parse(decodedData));
  };

  useEffect(() => {
    if (result.data) decodeSchooldata(result.data);
    console.log(schoolData);
  }, [result.data]);

  return (
    <>
      {fetching === false ? (
        <>
          <Navbar />
          <Heading schoolData={schoolData} />
          <Introduction schooldata={schoolData} />
          <Connectivity schoolData={schoolData} />
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
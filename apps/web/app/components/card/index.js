'use client';
import {
  ClickableTile,
  Column,
  Grid,
  Button,
  Toggletip,
  Loading,
  ToggletipContent,
  ToggletipButton,
} from '@carbon/react';
import './card.scss';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { toSvg } from 'jdenticon';

const SchoolCard = ({ query, variables, pageSize, setPageSize }) => {
  const [result] = useQuery({
    query: query,
    variables: variables,
  });
  const { data: queryData, fetching, error } = result;
  const [schoolData, setSchoolData] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const generateIdenticon = (image) => {
    const size = 50;
    const svgString = toSvg(image.toString(), size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  useEffect(() => {
    if (queryData) decodeSchooldata(queryData);
  }, [queryData]);

  const decodeSchooldata = (data) => {
    const encodeddata = variables?.id ? data?.collectorOwnedNft?.nfts : data?.collectorTokenUris;
    const decodedShooldata = [];
    for (let i = 0; i < encodeddata?.length; i++) {
      const decodedData = atob(encodeddata[i].tokenUri.substring(29));
      const schoolData = {
        tokenId: encodeddata[i].id,
        ...JSON.parse(decodedData),
      };
      decodedShooldata.push(schoolData);
    }
    setSchoolData(decodedShooldata);
  };

  const loadMore = () => {
    setPageSize(pageSize + pageSize);
    // if (pageSize < data?.meta.total - 12) {
    //   setPageSize(pageSize + 12);
    // } else {
    //   setPageSize(data.rows.length);
    //   setAllDataLoaded(true);
    // }
  };

  return (
    <>
      {fetching === false ? (
        <Grid fullWidth style={{ margin: '30px auto' }}>
          {schoolData.length > 0 ? (
            schoolData?.map((school) => (
              <Column sm={4}>
                <ClickableTile
                  className="card"
                  href={`/explore/${school?.tokenId}`}
                >
                  <div className="row">
                    <img
                      src={generateIdenticon(school?.image)}
                      alt="SVG Image"
                      style={{ marginBottom: '16px' }}
                    />
                    {/* <p className="text-purple">School Name</p> */}
                    <Toggletip align="right">
                      <ToggletipButton label="Show information">
                        <h4>
                          {school?.schoolName?.length > 30
                            ? `${school.schoolName
                                ?.toLowerCase()
                                .split(' ')
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' ')
                                .slice(0, 30)}...`
                            : school.schoolName
                                ?.toLowerCase()
                                .split(' ')
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' ')}
                        </h4>
                      </ToggletipButton>
                      <ToggletipContent>
                        <p>
                          {school.schoolName
                            ?.toLowerCase()
                            .split(' ')
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ')}
                        </p>
                      </ToggletipContent>
                    </Toggletip>
                    <div>
                      <h4 className="heading2 text-left">
                        {school?.country
                          ? school?.country?.length > 15
                            ? `${school.country
                                ?.toLowerCase()
                                .split(' ')
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' ')
                                .slice(0, 15)}...`
                            : school.country
                                ?.toLowerCase()
                                .split(' ')
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' ')
                          : 'N/A'}
                      </h4>
                    </div>
                    {/* <p className="text-purple">Education Level</p> */}
                    {/* <div>
                      <h4 className="heading2">
                        {school.covergeAvailability || 'N/A'}
                      </h4>
                    </div> */}
                  </div>
                </ClickableTile>
              </Column>
            ))
          ) : (
            <Column sm={4} md={8} lg={16}>
              <h1>No school has been minted</h1>
            </Column>
          )}
          <Column sm={4} md={8} lg={16}>
            <Button
              onClick={loadMore}
              kind="tertiary"
              disabled={allDataLoaded}
              style={{ float: 'right' }}
            >
              {allDataLoaded === false ? 'Load more' : 'No more data'}
            </Button>
          </Column>
        </Grid>
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

export default SchoolCard;

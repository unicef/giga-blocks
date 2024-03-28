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
  Search,
} from '@carbon/react';
import './card.scss';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { Queries } from '../../libs/graph-query';
import { getNftContract } from '../web3/contracts/getContract';
import { useWeb3React } from '@web3-react/core';
import useDebounce from '../../hooks/useDebounce';

const SchoolCard = ({ query, variables, pageSize, setPageSize, setSearch }) => {
  const [searchText, setSearchText] = useState('');
  const { account } = useWeb3React();
  const debouncedSearch = useDebounce(searchText, 500);

  const [result] = useQuery({
    query: query,
    variables: { ...variables, name: debouncedSearch },
  });
  const [imagedata] = useQuery({
    query: Queries.nftImages,
    variables: { ...variables },
  });

  const { data: queryData, fetching, error } = result;
  const [schoolData, setSchoolData] = useState([]);
  const [datafetching, setDataFetching] = useState(fetching);
  const [imageData, setImageData] = useState([]);
  const contract = getNftContract(
    process.env.NEXT_PUBLIC_GIGA_COLLECTOR_NFT_ADDRESS
  );

  useEffect(() => {
    if (imagedata) decodeImage(imagedata?.data?.nftImages);
    if (queryData) decodeSchooldata(queryData,imagedata?.data?.nftImages);
  }, [queryData, imagedata, account]);

  const decodeImage = (data) => {
    const decodedImage = [];
    data?.map((dat) => {
      const imageData = {
        tokenId: dat.id,
        image: dat.imageScript,
      };
      decodedImage.push(imageData);
    });
    setImageData(decodedImage);
  };

  const decodeSchooldata = async (data,images) => {
    const encodeddata = variables?.id
      ? data?.collectorOwnedNft?.nfts
      : data?.nftDatas;
    const decodedShooldata = [];
    if (!variables?.id) {
      await Promise.all(
        encodeddata?.map(async (data) => {
          setDataFetching(true);
          var owner;
          try {
          owner = await contract.methods.ownerOf(data.id).call();  
          } catch (error) {
            console.log(error)
          }
          var sold = false;
          if (
            owner?.toLowerCase() ===
            process.env.NEXT_PUBLIC_GIGA_ESCROW_ADDRESS.toLowerCase()
          )
            sold = false;
          else sold = true;
          const image = images.find(image => image.id === data.id);
          const schoolData = {
            tokenId: data.id,
            schoolName: data.name,
            country: data.location,
            sold: sold,
            image:image?image?.imageScript:''
          };

          decodedShooldata.push(schoolData);
          setDataFetching(false);
        })
      );
    } else {
      encodeddata?.map((data) => {
        const decodedData = atob(data.tokenUri.substring(29));
        const schoolData = {
          tokenId: data.id,
          ...JSON.parse(decodedData),
        };
        decodedShooldata.push(schoolData);
      });
    }
    setSchoolData(decodedShooldata);
    setDataFetching(false);
  };

  const loadMore = () => {
    setPageSize(pageSize + pageSize);
  };

  return (
    <>
      {setSearch && (
        <div style={{ padding: '80px 40px 10px 40px' }}>
          <Search
            size="lg"
            placeholder="Search NFT"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      )}
      {datafetching === false ? (
        <Grid fullWidth style={{ margin: '30px auto' }}>
          {schoolData.length > 0 ? (
            schoolData?.map((school, index) => (
              <Column sm={4}>
                <ClickableTile
                  key={index}
                  className="card"
                  href={`/explore/${school?.tokenId}`}
                >
                  <div className="row" key={index}>
               <img
                      src={`https://ipfs.io/ipfs/${school?.image || 'QmQ5MAbK8jwcZ1wpmhj99EqRJAXr7p7cHBfhnDz3gde4jy'}`}
                      alt={school?.schoolName}
                      style={{ marginBottom: '16px' }}
                    />
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
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
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
                      {school?.sold && <p className="sold">Sold</p>}
                    </div>
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
            {schoolData.length > 0 && (
              <Button className="load-more" onClick={loadMore} kind="tertiary">
                Load more
              </Button>
            )}
          </Column>
        </Grid>
      ) : (
        <div className="loader-container">
          <Loading withOverlay={false} />{' '}
          <span>Loading school data, please wait...</span>{' '}
        </div>
      )}
    </>
  );
};

export default SchoolCard;

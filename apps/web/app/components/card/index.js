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
import { toSvg } from 'jdenticon';
import { Queries } from '../../libs/graph-query';
import GenerateP5 from '../generateP5';

// const DynamicScript = dynamic(() => import('./p5'), { ssr: false });

const SchoolCard = ({ query, variables, pageSize, setPageSize }) => {
  const [searchText, setSearchText] = useState('');

  const [result] = useQuery({
    query: query,
    variables: { ...variables, name: searchText },
  });
  const [imagedata] = useQuery({
    query: Queries.nftImages,
    variables: { ...variables },
  });
  const { data: queryData, fetching, error } = result;
  const [schoolData, setSchoolData] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [imageData, setImageData] = useState([]);

  const generateIdenticon = (image) => {
    const size = 50;
    const svgString = toSvg(image?.toString(), size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  useEffect(() => {
    if (queryData) decodeSchooldata(queryData);
    if (imagedata) decodeImage(imagedata?.data?.nftImages);
  }, [queryData, imagedata]);


  console.log(imageData)
  const decodeImage = (data) => {
    const decodedImage = [];
    for (let i = 0; i < data?.length; i++) {
      const imageData = {
        tokenId: data[i].id,
        image: data[i].imageScript,
      };
      decodedImage.push(imageData);
    }
    setImageData(decodedImage);
  };

  const decodeSchooldata = (data) => {
    const encodeddata = variables?.id
      ? data?.collectorOwnedNft?.nfts
      : data?.nftDatas;
    const decodedShooldata = [];

    if (!variables?.id) {
      for (let i = 0; i < encodeddata?.length; i++) {
        const schoolData = {
          tokenId: encodeddata[i].id,
          schoolName: encodeddata[i].name,
          country: encodeddata[i].location,
        };
        decodedShooldata.push(schoolData);
      }
    } else {
      for (let i = 0; i < encodeddata?.length; i++) {
        const decodedData = atob(encodeddata[i].tokenUri.substring(29));
        const schoolData = {
          tokenId: encodeddata[i].id,
          ...JSON.parse(decodedData),
        };
        decodedShooldata.push(schoolData);
      }
    }
    setSchoolData(decodedShooldata);
  };

  const loadMore = () => {
    setPageSize(pageSize + pageSize);
  };


  const p5Script = 'let colors; let angle = 0; function setup() {createCanvas(800, 600);colors = generateRandomColors(5); }  function draw() {background(255); drawRotatingGradient();drawPulsatingCircle(); drawPattern(); }function drawRotatingGradient() { translate(width / 2, height / 2);rotate(radians(angle));  let gradientSize = 400;for (let i = 0; i < colors.length; i++) {let c = colors[i];fill(c);rect(0, 0, gradientSize, gradientSize);rotate(PI / 4);}angle += 1;} function drawPulsatingCircle() {let pulseSize = sin(frameCount * 0.05) * 50 + 100; let c = colors[2]; fill(c); noStroke(); ellipse(width / 2, height / 2, pulseSize, pulseSize);} function drawPattern() {let rectSize = 50; for (let x = 0; x < width; x += rectSize + 10) {for (let y = 0; y < height; y += rectSize + 10) { let c = random(colors); fill(c); rect(x, y, rectSize, rectSize); } }  } function generateRandomColors(count) { let generatedColors = []; for (let i = 0; i < count; i++) { let randomColor = color(random(255), random(255), random(255)); generatedColors.push(randomColor);} return generatedColors; }'


  return (
    <>
      <div style={{ padding: '80px 40px 10px 40px' }}>
        <Search
          size="lg"
          placeholder="Search School Name"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      {fetching === false ? (
        <Grid fullWidth style={{ margin: '30px auto' }}>
          {schoolData.length > 0 ? (
            schoolData.map((school, idx) => (
              <Column key={idx} sm={4}>
                <ClickableTile
                  className="card"
                  href={`/explore/${school?.tokenId}`}
                >
                  <div className="row">
                    {imageData.length > 0 &&
                    imageData?.find(
                      (image) => image.tokenId === school?.tokenId
                    )?.image ? (
                      <>
                      {/* <DynamicScript
                        scriptContent={
                          imageData?.find(
                            (image) => image.tokenId === school?.tokenId
                          )?.image
                        }
                      /> */}
                      <GenerateP5 scriptContent={p5Script} />
                      </>
                    ) : null}
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
          <Loading withOverlay={false} />{' '}
          <span>Loading school data, please wait...</span>{' '}
        </div>
      )}
    </>
  );
};

export default SchoolCard;

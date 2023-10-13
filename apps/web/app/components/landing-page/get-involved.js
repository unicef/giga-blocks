import { Grid, Column, Tile } from '@carbon/react';
import './styles/preview.scss';
import Card from '../reuseable/card';

const GetInvolved = () => {
  const cards = [
    {
      title: 'Purchase School NFTs',
      description:
        'By purchasing collector-copies of school NFTs, you help sponsor the creation of the worlds largest on-chain database of school data and contribute to the decentralized ownership of this data.',
    },
    {
      title: 'Join the developer community',
      description:
        'By joining the developer community, you will get the opportunity to work together with Giga in building dApps that create value for schools around the world.',
    },
    // {
    //   title: 'Mint NFTs',
    //   description:
    //     "Become a school's digital guardian by minting NFTs representing their existence. Every NFT minted fuels the mission to bridge the digital gap.",
    // },
  ];
  return (
    <div className="get-involved-background" id="involved">
      <h1 className="text-white heading8">How can you get involved?</h1>
      <Grid className="mp-0" fullWidth>
        {cards.map((card) => {
          return (
            <Column
              lg={4}
              md={8}
              sm={4}
              style={{ padding: '0px', margin: '0.5px' }}
            >
              <Card title={card.title} description={card.description} />
            </Column>
          );
        })}
      </Grid>
    </div>
  );
};

export default GetInvolved;

import { Grid, Column } from '@carbon/react';
import './styles/preview.scss';

const WhyNFT2 = () => {
  return (
    <Grid className="why-nft" fullWidth>
      <Column md={4} lg={4} sm={4} style={{ margin: '0 auto', width: '90%' }}>
        <span className="heading7">How can you get involved?</span>
      </Column>
      <Column md={4} lg={6} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Purchase school NFTs</span>
          <section></section>
          <p className="heading2 width-90">
            By purchasing collector-copies of school NFTs, you help sponsor the
            creation of the worlds largest on-chain database of school data and
            contribute to the decentralized ownership of this data.
          </p>
        </div>
      </Column>
      <Column md={4} lg={6} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Collaboration</span>
          <section></section>
          <p className="heading2 width-90">
            By joining the developer community, you will get the opportunity to
            work together with Giga in building dApps that create value for
            schools around the world.
          </p>
        </div>
      </Column>
    </Grid>
  );
};

export default WhyNFT2;

import { Grid, Column } from '@carbon/react';
import './styles/preview.scss';

const WhyNFT2 = () => {
  return (
    <>
      <Grid className="why-nft-0" fullWidth>
        <Column md={4} lg={4} sm={4} style={{ margin: '0 auto', width: '90%' }}>
          <span className="heading7">
            Why Join the NFT2.0 <br /> developer community?
          </span>
        </Column>
        <Column md={4} lg={4} sm={4}>
          <div className="why-nft-card">
            <section>
              <img
                src="/landingPage/why-nft/empowerment.png"
                alt="NFT empowerment"
                style={{ marginBottom: '28px' }}
              />
            </section>
            <span className="heading20">Innovation</span>
            <p className="heading2 width-90">
              Utilizing NFTs representing school data, you can pioneer
              applications and platforms that define decentralized public
              infrastructure.
            </p>
          </div>
        </Column>
        <Column md={4} lg={4} sm={4}>
          <div className="why-nft-card">
            <section>
              <img
                src="/landingPage/why-nft/community.png"
                alt="NFT empowerment"
                style={{ marginBottom: '28px' }}
              />
            </section>
            <span className="heading20">Collaboration</span>

            <p className="heading2 width-90">
              NFT 2.0 fosters a space for developers, blockchain enthusiasts,
              and dePin advocates. Collaborate, share ideas, and push the
              boundaries of what's possible.
            </p>
          </div>
        </Column>
        <Column md={4} lg={4} sm={4}>
          <div className="why-nft-card">
            <section>
              <img
                src="/landingPage/why-nft/global.png"
                alt="NFT empowerment"
                style={{ marginBottom: '28px' }}
              />
            </section>
            <span className="heading20">Broad Impact</span>

            <p className="heading2 width-90">
              Engage in a movement that transcends geographical boundaries. With
              NFT 2.0, ensure every student, everywhere, benefits from the
              digital age.
            </p>
          </div>
        </Column>
      </Grid>
      <div className="border-bottom"></div>
    </>
  );
};

export default WhyNFT2;

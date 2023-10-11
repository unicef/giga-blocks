import { Grid, Column } from '@carbon/react';
import './styles/preview.scss';

const WhyNFT2 = () => {
  return (
    <Grid className="preview-2 why-nft" fullWidth>
      <Column md={4} lg={4} sm={4} style={{ margin: '0 auto', width: '90%' }}>
        <span className="heading7">
          Why Join the NFT2.0 developer community?
        </span>
      </Column>
      <Column md={4} lg={4} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Innovation</span>
          <section>
            <img
              src="/landingPage/why-nft/empowerment.png"
              alt="NFT empowerment"
            />
          </section>
          <p className="heading2 width-90">
            Utilizing NFTs representing school data, you can pioneer
            applications and platforms that define decentralized public
            infrastructure.
          </p>
        </div>
      </Column>
      <Column md={4} lg={4} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Collaboration</span>
          <section>
            <img
              src="/landingPage/why-nft/community.png"
              alt="NFT empowerment"
            />
          </section>
          <p className="heading2 width-90">
            NFT 2.0 fosters a space for developers, blockchain enthusiasts, and
            dePin advocates. Collaborate, share ideas, and push the boundaries
            of what's possible.
          </p>
        </div>
      </Column>
      <Column md={4} lg={4} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Broad Impact</span>
          <section>
            <img src="/landingPage/why-nft/global.png" alt="NFT empowerment" />
          </section>
          <p className="heading2 width-90">
            Engage in a movement that transcends geographical boundaries. With
            NFT 2.0, ensure every student, everywhere, benefits from the digital
            age.
          </p>
        </div>
      </Column>
    </Grid>
  );
};

export default WhyNFT2;

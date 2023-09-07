import { Grid, Column } from "@carbon/react";
import "./styles/preview.scss";

const WhyNFT2 = () => {
  return (
    <Grid className="preview-2 why-nft" fullWidth>
      <Column md={4} lg={4} sm={4} style={{ margin: "0 auto", width: "90%" }}>
        <span>Why join NFT 2.0?</span>
      </Column>
      <Column md={4} lg={4} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Empowerment</span>
          <section>
            <img
              src="/landingPage/why-nft/empowerment.png"
              alt="NFT empowerment"
            />
          </section>
          <p className="heading2 width-90">
            By minting and owning NFTs representing schools, you become a
            catalyst for change, directly contributing to connecting schools to
            the internet and shaping a brighter future for students.
          </p>
        </div>
      </Column>
      <Column md={4} lg={4} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Community</span>
          <section>
            <img
              src="/landingPage/why-nft/community.png"
              alt="NFT empowerment"
            />
          </section>
          <p className="heading2 width-90">
            NFT2 brings together like-minded individuals, from blockchain
            enthusiasts to education advocates, fostering collaboration, sharing
            ideas, and driving innovation.
          </p>
        </div>
      </Column>
      <Column md={4} lg={4} sm={4}>
        <div className="why-nft-card">
          <span className="heading7">Global impact</span>
          <section>
            <img src="/landingPage/why-nft/global.png" alt="NFT empowerment" />
          </section>
          <p className="heading2 width-90">
            Every NFT2 participant is part of a global movement that transcends
            borders, connecting schools and paving the way for equitable digital
            access for all.
          </p>
        </div>
      </Column>
    </Grid>
  );
};

export default WhyNFT2;

import { Grid, Column, Tile } from "@carbon/react";
import "./styles/preview.scss";
import Card from "../reuseable/card";

const GetInvolved = () => {
  const cards = [
    {
      title: "Contribute School Data",
      description:
        "Join the community and start contributing school data or help ensure that the data that is being submitted is accurate.",
    },
    {
      title: "Earn Rewards",
      description:
        "Active participation means rewards. Contribute data, be acknowledged, and earn rewards that recognize your dedication to connecting schools worldwide.",
    },
    {
      title: "Mint NFTs",
      description:
        "Become a school's digital guardian by minting NFTs representing their existence. Every NFT minted fuels the mission to bridge the digital gap.",
    },
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
                style={{ padding: "0px", margin: "0.5px" }}
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

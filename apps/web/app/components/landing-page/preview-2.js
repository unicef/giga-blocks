import { Grid, Column } from "@carbon/react";
import "./styles/preview.scss";
import React from "react";

const Preview2 = () => {
  return (
    <Grid className="preview-2" fullWidth>
      <Column
        md={4}
        lg={7}
        sm={4}
        className=" content landing-page__tab-content"
      >
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            gap: "3vh",
          }}
        >
          <h2 className="heading8"> What is NFT 2.0?</h2>
          <p className="heading2">
            Imagine a global community coming together to create a distributed
            database of school data, each NFT representing a school with its
            unique story and journey. With your help, we can drive change,
            bridge the digital divide, and enable students around the world to
            access the resources they deserve.
          </p>
        </div>
      </Column>
      <Column
        md={4}
        lg={{ span: 16, offset: 7 }}
        sm={4}
        style={{ background: "gray" }}
      >
        <img
          className="landing-page__illo"
          src="/landingPage/preview-2/preview-2-img.png"
          alt="What is nft image"
          style={{ height: "400px", width: "100%", objectFit: "cover" }}
        />
      </Column>
    </Grid>
  );
};

export default Preview2;

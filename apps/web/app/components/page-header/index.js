"use client";
import { Grid, Column } from "@carbon/react";

const PageHeader = () => {
  return (
    <>
      <Grid className="preview1Background">
        <Column sm={16} md={10} lg={6} className="centerColumn">
          <Grid>
            <Column sm={16} md={10} lg={6}>
              <h1 className="heading8" style={{ marginBottom: "16px" }}>
                Schools
              </h1>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </>
  );
};

export default PageHeader;

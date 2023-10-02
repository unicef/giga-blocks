import { Grid, Column } from "@carbon/react";
import "../../components/landing-page/styles/preview.scss"
import { Tile } from "@carbon/react";
import './school-detail.scss'

const Introduction = (schooldata) => {
  console.log(schooldata)
  return (
    <Grid fullWidth className="mt-50px">
      <Column md={4} lg={5} sm={4} >
        <span style={{fontSize: '1.5em'}}>Introduction</span>
      </Column>
      <Column md={4} lg={4} sm={4} className="school-detail-card">
      <Tile className={`tile-school`}>
          <p className="heading2">
          School Name
          </p>
          <p className="heading5">
          Montessori Kinderworld
          </p>
        </Tile>
        <Tile className={`tile-school tile-white`}>
        <p className="heading2">
        Exact Location
          </p>
        <p className="heading5">
          lat 27.00020, lon 85.33535
        </p>
        </Tile>
        <Tile className={`tile-school tile-white`}>
        <p className="heading2">
        Physical Address/ Nearest Settlement
        </p>
        <p className="heading5">
        Mid-Baneshwore
        </p>
        </Tile>
      </Column>
      <Column md={4} lg={7} sm={4}>
        <div>
        <img style={{width: '100%'}} alt="School Map" src="/school-detail/map.png"/>
        </div>
      </Column>
    </Grid>
  );
};

export default Introduction;

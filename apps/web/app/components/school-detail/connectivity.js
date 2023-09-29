import { Grid, Column } from "@carbon/react";
import "../../components/landing-page/styles/preview.scss"
import { Tile } from "@carbon/react";
import './school-detail.scss'

const Connectivity = () => {
    return ( 
    <Grid fullWidth className="mt-50px">
      <Column md={4} lg={5} sm={4}>
        <span style={{fontSize: '1.5em'}}>Connectivity</span>
      </Column>
      <Column md={4} lg={11} sm={4} className="school-connectivity-cards">
      <Grid fullWidth className="school-connectivity-grid border-bottom">
        <Column className="school-connectivity-column">
        <div className="school-connectivity-card">
            <span className="heading2">Connectivity <br /> Status</span>
            <span className="heading5">Excellent</span>
        </div>
        </Column>
        <Column className="school-connectivity-column">
        <div className="school-connectivity-card">
            <span className="heading2">Coverage <br /> Availability</span>
            <span className="heading5">Yes</span>
        </div>
        </Column>
      </Grid>
      <Grid fullWidth className="school-connectivity-grid">
      <Column className="school-connectivity-column">
        <div className="school-connectivity-card">
            <span className="heading2">2G Coverage</span>
            <span className="heading5">Yes</span>
        </div>
        </Column>
        <Column className="school-connectivity-column">
        <div className="school-connectivity-card">
            <span className="heading2">3G Coverage</span>
            <span className="heading5">Yes</span>
        </div>
        </Column>
        <Column className="school-connectivity-column">
        <div className="school-connectivity-card">
            <span className="heading2">4G Coverage</span>
            <span className="heading5">Yes</span>
        </div>
        </Column>
      </Grid>
      </Column>
    </Grid>
     );
}
 
export default Connectivity;
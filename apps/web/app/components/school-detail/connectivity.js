import { Grid, Column } from '@carbon/react';
import '../../components/landing-page/styles/preview.scss';
import { Tile } from '@carbon/react';
import './school-detail.scss';

const Connectivity = ({ schoolData }) => {
  return (
    <>
      <Grid fullWidth className="mt-50px mb-50px">
        <Column md={4} lg={16} sm={4}>
          <div className="border-bottom"></div>
        </Column>
        <Column md={4} lg={5} sm={4}>
          <span style={{ fontSize: '1.5em' }}>NFT Details</span>
        </Column>
        <Column md={4} lg={11} sm={4} className="school-connectivity-cards">
          <Grid fullWidth className="school-connectivity-grid">
            <Column className="school-connectivity-column">
              <div className="school-connectivity-card">
                <span className="heading2">Connectivity Status</span>
                <span className="heading5" style={{ textAlign: 'left' }}>
                  {schoolData?.connectivity ? schoolData?.connectivity : 'N/A'}
                </span>
              </div>
              <div className="school-connectivity-card">
                <span className="heading2">Coverage Availability</span>
                <span className="heading5" style={{ textAlign: 'left' }}>
                  {schoolData?.coverage_availabitlity}
                </span>
              </div>
              <div className="school-connectivity-card">
                <span className="heading2">Connectivity Status</span>
                <span className="heading5" style={{ textAlign: 'left' }}>
                  {schoolData?.connectivity ? schoolData?.connectivity : 'N/A'}
                </span>
              </div>
              <div className="school-connectivity-card ">
                <span className="heading2">Coverage Availability</span>
                <span className="heading5" style={{ textAlign: 'left' }}>
                  {schoolData?.coverage_availabitlity}
                </span>
              </div>
            </Column>
          </Grid>
        </Column>
      </Grid>
      <Grid fullWidth>
        <Column md={4} lg={16} sm={4} style={{ marginTop: '36px' }}>
          <div className="border-bottom"></div>
        </Column>
      </Grid>
    </>
  );
};

export default Connectivity;

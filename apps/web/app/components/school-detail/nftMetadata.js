import { Grid, Column } from '@carbon/react';
import '../../components/landing-page/styles/preview.scss';
import './school-detail.scss';

const Connectivity = ({ schoolData }) => {
  let latitude = schoolData?.latitude.slice(0, 14);
  let longitude = schoolData?.longitude.slice(0, 14);
  return (
    <>
      <Grid fullWidth>
        <Column md={4} lg={5} sm={4} style={{ marginTop: '42px' }}>
          <span
            style={{
              fontSize: '1.5em',
            }}
          >
            Metadata
          </span>
        </Column>
        <Column md={4} lg={11} sm={4} className="school-connectivity-cards">
          <Grid fullWidth className="school-connectivity-grid">
            <Column
              md={4}
              lg={11}
              sm={4}
              className="school-connectivity-column"
            >
              <div className="school-connectivity-card">
                <Column
                  className="school-connectivity-data"
                  md={4}
                  lg={8}
                  sm={4}
                >
                  <div>
                    <span className="heading2" style={{ marginBottom: '14px' }}>
                      School Name
                    </span>
                    <span className="heading5">
                      <br />
                      {schoolData?.schoolName ? schoolData?.schoolName : 'N/A'}
                    </span>
                  </div>
                </Column>
                <Column
                  className="school-connectivity-data"
                  md={4}
                  lg={8}
                  sm={4}
                >
                  <span className="heading2" style={{ marginBottom: '14px' }}>
                    School Type
                  </span>
                  <br />
                  <span className="heading5">{schoolData?.schoolType}</span>
                </Column>
                <Column
                  className="school-connectivity-data"
                  md={4}
                  lg={8}
                  sm={4}
                >
                  <span className="heading2" style={{ marginBottom: '14px' }}>
                    Country
                  </span>
                  <span className="heading5">
                    <br />
                    {schoolData?.country ? schoolData?.country : 'N/A'}
                  </span>
                </Column>
                <Column
                  className="school-connectivity-data"
                  md={4}
                  lg={8}
                  sm={4}
                >
                  <span className="heading2" style={{ marginBottom: '14px' }}>
                    Exact Location
                  </span>
                  <span className="heading5">
                    <br />
                    {latitude}, {longitude}
                  </span>
                </Column>
              </div>
            </Column>
          </Grid>
          <Grid fullWidth className="school-connectivity-grid">
            <Column className="school-connectivity-column">
              <div className="school-connectivity-card-2">
                <Column
                  className="school-connectivity-data"
                  md={4}
                  lg={8}
                  sm={4}
                >
                  <div>
                    <span className="heading2" style={{ marginBottom: '14px' }}>
                      Connectivity Status
                    </span>
                    <span className="heading5">
                      <br />
                      {schoolData?.connectivity === 'true' ? 'Yes' : 'No'}
                    </span>
                  </div>
                </Column>
                <Column
                  className="school-connectivity-data"
                  md={4}
                  lg={8}
                  sm={4}
                >
                  <span className="heading2" style={{ marginBottom: '14px' }}>
                    Coverage Availability
                  </span>
                  <br />
                  <span className="heading5">
                    {schoolData?.coverage_availabitlity === 'true'
                      ? 'Yes'
                      : 'No'}
                  </span>
                </Column>

                <Column
                  className="school-connectivity-data"
                  md={4}
                  lg={8}
                  sm={4}
                >
                  <span className="heading2" style={{ marginBottom: '14px' }}>
                    Electricity Availability
                  </span>
                  <span className="heading5">
                    <br />
                    {schoolData?.electricity_availabilty === 'true'
                      ? 'Yes'
                      : 'No'}
                  </span>
                </Column>
              </div>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </>
  );
};

export default Connectivity;

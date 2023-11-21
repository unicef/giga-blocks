'use client';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { useSchoolDetails } from '../../hooks/useSchool';
import { Button, Column, Grid, Loading, Tile } from '@carbon/react';
import './school-details.scss';
import { useParams } from 'next/navigation';

const SchoolDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useSchoolDetails(id);

  return (
    <>
      {isLoading === false ? (
        <>
          <Navbar />

          {/* HEADING */}
          <Grid fullWidth>
            <Column lg={16} md={8} sm={8} className="school-detail-head">
              <h2>{data?.name}</h2>
            </Column>
          </Grid>

          {/* INTRODUCTION */}
          <Grid>
            <Column
              lg={16}
              md={8}
              sm={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: '15px',
              }}
            >
              <Button href={`/explore/${id}/contribute`}>Contribute</Button>
            </Column>
          </Grid>
          <Grid fullWidth className="mt-50px">
            <Column md={4} lg={5} sm={4}>
              <span style={{ fontSize: '1.5em' }}>Introduction</span>
            </Column>
            <Column md={4} lg={4} sm={4} className="school-detail-card">
              <Tile className={`tile-school`}>
                <p className="heading2">School Name</p>
                <p className="heading5">{data?.name}</p>
              </Tile>
              <Tile className={`tile-school tile-white`}>
                <p className="heading2">School Type</p>
                <p className="heading5">
                  {data?.school_type ? data?.school_type : 'N/A'}
                </p>
              </Tile>
              <Tile className={`tile-school tile-white`}>
                <p className="heading2">Exact Location</p>
                <p className="heading5">
                  {data?.latitude}, {data?.longitude}
                </p>
              </Tile>
              <Tile className={`tile-school tile-white`}>
                <p className="heading2">Country</p>
                <p className="heading5">{data?.country}</p>
              </Tile>
            </Column>
            <Column
              md={4}
              lg={7}
              sm={4}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {/* <img
                style={{
                  width: '60%',
                }}
                alt="School Map"
                src={generateIdenticon(data?.image)}
              /> */}
            </Column>
          </Grid>

          {/* CONNECTIVITY */}
          <Grid fullWidth className="mt-50px">
            <Column md={4} lg={5} sm={4}>
              <span style={{ fontSize: '1.5em' }}>Connectivity</span>
            </Column>
            <Column md={4} lg={11} sm={4} className="school-connectivity-cards">
              <Grid
                fullWidth
                className="school-connectivity-grid border-bottom"
              >
                <Column className="school-connectivity-column">
                  <div className="school-connectivity-card">
                    <span className="heading2">
                      Connectivity <br /> Status
                    </span>
                    <span className="heading5">
                      {data?.connectivity ? 'True' : 'N/A'}
                    </span>
                  </div>
                </Column>
                <Column className="school-connectivity-column">
                  <div className="school-connectivity-card">
                    <span className="heading2">
                      Coverage <br /> Availability
                    </span>
                    <span className="heading5">
                      {data?.coverage_availability
                        ? data?.coverage_availability
                        : 'N/A'}
                    </span>
                  </div>
                </Column>
              </Grid>
              <Grid fullWidth className="school-connectivity-grid">
                <Column className="school-connectivity-column">
                  <div className="school-connectivity-card">
                    <span className="heading2">Electricity</span>
                    {data?.electricity_available ? 'Yes' : 'No'}
                  </div>
                </Column>
              </Grid>
            </Column>
          </Grid>
          <Footer />
        </>
      ) : (
        <div className="loader-container">
          {' '}
          <Loading withOverlay={false} />{' '}
          <span>Loading school data, please wait...</span>{' '}
        </div>
      )}
    </>
  );
};

export default SchoolDetail;

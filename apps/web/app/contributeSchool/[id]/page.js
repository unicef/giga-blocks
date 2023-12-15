'use client';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import ChangeLog from '../../components/changeLog';
import { useSchoolDetails } from '../../hooks/useSchool';
import ContributeForm from '../../components/contribute';
import {
  Button,
  Column,
  Grid,
  Loading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tile,
} from '@carbon/react';
import './school-details.scss';
import { useParams } from 'next/navigation';
import { toSvg } from 'jdenticon';
import { useState } from 'react';
import PageHeader from '../../components/page-header';
import { getCurrentUser } from '../../utils/sessionManager';
import { useRouter } from 'next/navigation';

const SchoolDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useSchoolDetails(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = getCurrentUser();
  const openModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      router.push('/signIn');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateIdenticon = (image) => {
    const size = 50;
    const svgString = toSvg(image, size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  const breadcrumbs = [
    { text: 'Home', link: '/' },
    { text: 'School', link: '/contributeSchool' },
  ];

  return (
    <>
      {isLoading === false ? (
        <>
          <Navbar />
          {/* HEADING */}
          <PageHeader name={data.name} breadcrumbs={breadcrumbs} />

          {/* INTRODUCTION */}

          <Tabs>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#222222',
              }}
            >
              <TabList
                style={{
                  display: 'flex',
                }}
              >
                <Tab
                  style={{
                    marginRight: '32px',
                    color: 'white',
                  }}
                >
                  School Data
                </Tab>
                <Tab style={{ color: 'white' }}>Change Log</Tab>
              </TabList>
              <Button onClick={openModal}>Contribute</Button>
            </div>
            <TabPanels>
              <TabPanel>
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
                      <p className="heading2">Country</p>
                      <p className="heading5">{data?.country}</p>
                    </Tile>
                    <Tile className={`tile-school tile-white`}>
                      <p className="heading2">Exact Location</p>
                      <p className="heading5">
                        {data?.latitude}, {data?.longitude}
                      </p>
                    </Tile>
                  </Column>
                  <Column
                    md={4}
                    lg={7}
                    sm={4}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <p>Last Updated:{data?.updatedAt.substring(0, 10)}</p>
                    <img
                      style={{
                        width: '60%',
                      }}
                      alt="School Map"
                      src={generateIdenticon(data?.giga_school_id)}
                    />
                  </Column>
                </Grid>

                {/* CONNECTIVITY */}
                <Grid fullWidth className="mt-50px">
                  <Column md={4} lg={5} sm={4}>
                    <span style={{ fontSize: '1.5em' }}>Connectivity</span>
                  </Column>
                  <Column
                    md={4}
                    lg={11}
                    sm={4}
                    className="school-connectivity-cards"
                  >
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
                            {data?.connectivity ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </Column>
                      <Column className="school-connectivity-column">
                        <div className="school-connectivity-card">
                          <span className="heading2">
                            Coverage <br /> Availability
                          </span>
                          <span className="heading5">
                            {data?.coverage_availability ? 'Yes' : 'No'}
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
              </TabPanel>
              <TabPanel>
                <ChangeLog schoolid={id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ContributeForm
            isOpen={isModalOpen}
            onClose={closeModal}
            data={data}
          />
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

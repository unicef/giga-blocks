'use client';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import ChangeLog from '../../components/changeLog';
import { useSchoolDetails } from '../../hooks/useSchool';
import ContributeForm from '../../components/contribute';
import { MapView } from '../../components/maps';
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
  InlineLoading,
} from '@carbon/react';
import './school-details.scss';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import PageHeader from '../../components/page-header';
import { getCurrentUser } from '../../utils/sessionManager';
import { useRouter } from 'next/navigation';

const SchoolDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useSchoolDetails(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState({selectedIndex: 0});

  const user = getCurrentUser();
  const openModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      router.push('/signIn');
    }
  };

  const updateSelectedTabIndex = (index) => {
    setSelectedTabIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <PageHeader name={data?.name} breadcrumbs={breadcrumbs} />
          <Tabs
            selectedIndex={selectedTabIndex.selectedIndex}
            onChange={updateSelectedTabIndex}
          >
            <div className="tabs">
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
                      width: '100%',
                    }}
                  >
                    <p style={{ fontSize: '12px' }}>
                      Last Updated:{data?.updatedAt.substring(0, 10)}
                    </p>
                    <div style={{ width: '450px' }}>
                      {isLoading ? (
                        <InlineLoading
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          status="active"
                          iconDescription="Loading"
                          description="Loading map..."
                        />
                      ) : (
                        <MapView
                          mapData={[
                            {
                              latitude: data?.latitude,
                              longitude: data?.longitude,
                            },
                          ]}
                        />
                      )}
                    </div>
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
                          <span className="heading2">Connectivity Status</span>
                          <span className="heading5">
                            {data?.connectivity ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </Column>
                      <Column className="school-connectivity-column">
                        <div className="school-connectivity-card">
                          <span className="heading2">
                            Coverage Availability
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
            updateSelectedTabIndex={updateSelectedTabIndex}
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

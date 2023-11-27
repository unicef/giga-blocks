import {
  Grid,
  Column,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from '@carbon/react';
import '../../components/landing-page/styles/preview.scss';
import './school-detail.scss';

const Connectivity = () => {
  return (
    <>
      <Grid fullWidth className="mb-50px">
        <Column md={4} lg={5} sm={4}>
          <span style={{ fontSize: '1.5em' }}>Transaction History</span>
        </Column>
        <Column md={4} lg={11} sm={4} className="school-connectivity-cards">
          <Tabs>
            <TabList aria-label="List of tabs">
              <Tab style={{ marginRight: '32px' }}>Collector NFT</Tab>
              <Tab>School NFT</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer sx={{ my: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow style={{ background: '#2c2b33' }}>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', color: 'white' }}
                        >
                          {'School Name'}
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', color: 'white' }}
                        >
                          {'Contributor'}
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', color: 'white' }}
                        >
                          {'What has been contributed'}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          backgroundColor: '#f5f5f5',
                        }}
                      >
                        <TableCell>school name</TableCell>
                        <TableCell>contributor name</TableCell>
                        <TableCell>contributed data</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer sx={{ my: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow style={{ background: '#2c2b33' }}>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', color: 'white' }}
                        >
                          {'School Name'}
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', color: 'white' }}
                        >
                          {'Contributor'}
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', color: 'white' }}
                        >
                          {'What has been contributed'}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          backgroundColor: '#f5f5f5',
                        }}
                      >
                        <TableCell>school name</TableCell>
                        <TableCell>contributor name</TableCell>
                        <TableCell>contributed data</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
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

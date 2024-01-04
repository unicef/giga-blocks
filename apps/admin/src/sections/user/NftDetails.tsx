import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  Grid,
  Stack,
  Container,
  Typography,
  TableContainer,
  TableBody,
  Table,
  Tabs,
  Tab,
} from '@mui/material';
import { useSnackbar } from '@components/snackbar';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
// @ts-ignore
import Identicon from 'react-identicons';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import NFTTableRow from './list/NFTTableRow';
import { PATH_DASHBOARD, PATH_SCHOOL } from '@routes/paths';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
}

interface FormValuesProps {
  id: string;
  name: string;
  email: string;
  position: string | null;
  phone: string;
  affiliation: string | null;
  roles: string;
  is_active: boolean;
}

export default function SchoolDetails({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const TABLE_HEAD = [
    { id: 'blockNumber', label: 'Block number', align: 'left' },
    { id: 'from', label: 'From', align: 'left' },
    { id: 'to', label: 'To', align: 'left' },
    { id: 'transactionHash', label: 'Transaction Hash', align: 'left' },
    { id: 'blockTimestamp', label: 'Timestamp', align: 'left' },
    { id: '__typename', label: 'Type', align: 'left' },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [profile, setProfile] = useState({
    fullname: '',
    location: '',
    latitude: '',
    longitude: '',
    connectivity: '',
    coverage: '',
    mintedStatus: '',
    tokenId: '',
    electricity_availabilty: ''
  });

  const [result] = useQuery({ query: Queries.nftDetailsQuery, variables: { id } });
  const { data, fetching, error } = result;
  const [schoolTableData, setTableData] = useState<any>([]);
  const [collectorTableData, setCollectorTableData] = useState<any>([]);

  useEffect(() => {
    setTableData(data?.schoolTransfers);
    setCollectorTableData(data?.collectorTransfers);
  }, [fetching, result]);

  const decodeData = (schooldata: any) => {
    const encodeddata = schooldata?.schoolTokenUri;
    const decodedData = atob(encodeddata.tokenUri.substring(29));
    const schoolData = {
      tokenId: encodeddata?.id,
      ...JSON.parse(decodedData),
    };

    setProfile({
      fullname: schoolData.schoolName,
      location: schoolData.country,
      latitude: schoolData.latitude,
      longitude: schoolData.longitude,
      connectivity: schoolData.connectivity,
      coverage: schoolData.coverage_availabitlity,
      mintedStatus: schoolData.minted,
      tokenId: schoolData.tokenId,
      electricity_availabilty: schoolData.electricity_availabilty
    });
  };

  const {
    dense,
    page,
    setPage,
    order,
    orderBy,
    rowsPerPage,
    onChangePage,
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();

  useEffect(() => {
    if (data) decodeData(data);
    if (error) enqueueSnackbar(error.message, { variant: 'error' });
  }, [data, error]);

  const methods = useForm<FormValuesProps>({});

  const schoolSortedData = schoolTableData?.slice().sort((a: any, b: any) => {
    const isAsc = order === 'asc';
    return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  });

  const collectorSortedData = collectorTableData?.slice().sort((a: any, b: any) => {
    const isAsc = order === 'asc';
    return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  });

  const chain = process.env.NEXT_PUBLIC_DEFAULT_CHAIN;
  const address = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS;

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props: any) {
    const { children, value, index, ...other } = props;
  
    return (
      //@ts-ignore
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      {fetching && <p>Loading...</p>}
      {!fetching && (
        <>
          <Grid item xs={8}>
            <Container>
              <CustomBreadcrumbs
                heading="NFT Detail Page"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Minted', href: PATH_SCHOOL.verified },
                  { name: 'Detail' },
                ]}
              />
              <FormProvider methods={methods}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Box rowGap={3} columnGap={2} display="grid">
                        <Typography variant="h6" component="h6">
                          School Details
                        </Typography>
                        <ProfileTextField
                          name="name"
                          value={profile?.fullname || ''}
                          label="Full Name"
                          disabled
                        />

                        <ProfileTextField
                          name="location"
                          value={profile?.location || ''}
                          label="Location"
                          disabled
                        />
                        <Box
                          display="grid"
                          rowGap={3}
                          columnGap={8}
                          gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                          }}
                        >
                          <ProfileTextField
                            name="latitude"
                            value={profile?.latitude || ''}
                            label="Latitude"
                            disabled
                          />
                          <ProfileTextField
                            name="longitude"
                            value={profile?.longitude || ''}
                            label="Longitude"
                            disabled
                          />
                          <ProfileTextField
                            name="connectivity"
                            value={profile?.connectivity.toLowerCase() === "true" ? 'Yes' : 'No' || ''}
                            label="Connectivity"
                            disabled
                          />
                          <ProfileTextField
                            name="coverage"
                            value={profile?.coverage.toLowerCase() === "true" ? 'Yes' : 'No' || ''}
                            label="Coverage"
                            disabled
                          />
                          <ProfileTextField
                            name="coverage"
                            value={profile?.electricity_availabilty.toLowerCase() === "true" ? 'Yes' : 'No' || ''}
                            label="Electricity Availabilty"
                            disabled
                          />
                        </Box>
                      </Box>
                      <Box rowGap={3} columnGap={2} sx={{ mt: 6 }} display="grid">
                        <Typography variant="h6" component="h6">
                          NFT Details
                        </Typography>
                        <ProfileTextField
                          name="tokenId"
                          value={profile?.tokenId || ''}
                          label="TokenId"
                          disabled
                        />
                        <ProfileTextField
                          name="ownerId"
                          value={result?.data?.schoolTokenUri?.owner?.id || ''}
                          label="OwnerId"
                          disabled
                        />
                        <Box
                          display="grid"
                          rowGap={3}
                          columnGap={8}
                          gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                          }}
                        >
                          <ProfileTextField
                            name="Chain"
                            value={chain || ''}
                            label="Chain"
                            disabled
                          />
                          <ProfileTextField
                            name="address"
                            value={address || ''}
                            label="Contract Address"
                            disabled
                          />
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </FormProvider>
            </Container>
          </Grid>
          <Grid item xs={4}>
            <Container>
              <Box justifyContent={'center'}>
                <Stack sx={{ mt: 8 }}>
                  <Box display="flex" justifyContent="center">
                    <Identicon string={profile?.fullname} size={200} />
                  </Box>
                </Stack>
                <Stack sx={{ mt: 8 }}>
                  <Box display="flex" justifyContent="center">
                    <a href={`${process.env.NEXT_PUBLIC_WEB_NAME}/explore/${id}`} target="_blank">View NFT</a>
                  </Box>
                </Stack>
              </Box>
            </Container>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '96%', margin: 'auto', marginTop: '20px' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Collector NFT" {...a11yProps(0)} />
            <Tab label="School NFT" {...a11yProps(1)} />
          </Tabs>
        </Box>
        
        <CustomTabPanel 
        //@ts-ignore
        value={value} 
        //@ts-ignore
        index={0} style={{width: '100%'}}>
        <Grid sx={{ margin: 'auto', marginTop: '10px' }}>
            <Typography variant="h6" component="h6">
              Transaction History
            </Typography>
            <Card sx={{ marginTop: '20px' }}>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                  <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                    <TableHeadUsers
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={schoolTableData?.length}
                      onSort={onSort}
                      showCheckBox={true}
                    />

                    <TableBody>
                      {collectorSortedData &&
                        collectorSortedData?.map((row: any) => (
                          <NFTTableRow
                            key={row.id}
                            row={row}
                          />
                        ))}
                      <TableNoData isNotFound={schoolTableData?.length === 0} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </Card>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel
        //@ts-ignore
         value={value}
        //@ts-ignore
        index={1} style={{width: '100%'}}>
        <Grid sx={{ margin: 'auto', marginTop: '10px' }}>
            <Typography variant="h6" component="h6">
              Transaction History
            </Typography>
            <Card sx={{ marginTop: '20px' }}>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                  <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                    <TableHeadUsers
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={schoolTableData?.length}
                      onSort={onSort}
                      showCheckBox={true}
                    />

                    <TableBody>
                      {schoolSortedData &&
                        schoolSortedData?.map((row: any) => (
                          <NFTTableRow
                            key={row.id}
                            row={row}
                          />
                        ))}
                      <TableNoData isNotFound={schoolTableData?.length === 0} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={data?.schoolTransfers?.length}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                dense={dense}
                onChangeDense={onChangeDense}
                />
            </Card>
          </Grid>
        </CustomTabPanel>
        </>
      )}
    </>
  );
}

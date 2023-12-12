import { useState, ChangeEvent, useEffect, use } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Card,
  Grid,
  Stack,
  MenuItem,
  Select,
  Button,
  Container,
  Typography,
  createChainedFunction,
  TableContainer,
  TableBody,
  Table,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useSnackbar } from '@components/snackbar';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import { AdministrationService } from '@services/administration';
import { useSchoolGetById } from '@hooks/school/useSchool';
import Image from 'next/image';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
// @ts-ignore
import Identicon from 'react-identicons';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import SchoolTableRow from './list/SchoolTableRow';
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
    // { id: 'checkbox', label: '', align: 'left' },
    { id: 'blockNumber', label: 'Block number', align: 'left' },
    { id: 'from', label: 'From', align: 'left' },
    { id: 'to', label: 'To', align: 'left' },
    { id: 'transactionHash', label: 'Transaction Hash', align: 'left' },
    { id: 'blockTimestamp', label: 'Timestamp', align: 'left' },
    { id: '__typename', label: 'Type', align: 'left' },
  ];

  const [profile, setProfile] = useState({
    fullname: '',
    location: '',
    latitude: '',
    longitude: '',
    connectivity: '',
    coverage: '',
    mintedStatus: '',
    tokenId: '',
  });

  const [result] = useQuery({ query: Queries.nftDetailsQuery, variables: { id } });
  const { data, fetching, error } = result;
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    setTableData(data?.schoolTransfers);
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
    onSelectRow,
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();

  useEffect(() => {
    if (data) decodeData(data);
    if (error) enqueueSnackbar(error.message, { variant: 'error' });
  }, [data, error]);

  const methods = useForm<FormValuesProps>({});

  const sortedData = tableData?.slice().sort((a: any, b: any) => {
    const isAsc = order === 'asc';
    return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  });

  const chain = process.env.NEXT_PUBLIC_DEFAULT_CHAIN;
  const address = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS;

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
                            value={profile?.connectivity || ''}
                            label="Connectivity"
                            disabled
                          />
                          <ProfileTextField
                            name="coverage"
                            value={profile?.coverage || ''}
                            label="Coverage"
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
                {/* <Image width={250} height={250} alt='USER' src={'/assets/Image-right.svg'}/> */}
                <Stack sx={{ mt: 8 }}>
                  <Box display="flex" justifyContent="center">
                    <Identicon string={profile?.fullname} size={200} />
                  </Box>
                </Stack>
              </Box>
            </Container>
          </Grid>
          <Grid xs={11} sx={{ margin: 'auto', marginTop: '50px' }}>
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
                      rowCount={tableData?.length}
                      onSort={onSort}
                      showCheckBox={true}
                      // numSelected={selectedValues?.length}
                      // onSelectAllRows={onSelectAllRows}
                    />

                    <TableBody>
                      {sortedData &&
                        sortedData.map((row: any) => (
                          <NFTTableRow
                            key={row.id}
                            row={row}
                            // selectedValues={selectedValues}
                            // setSelectedValues={setSelectedValues}
                            rowData={row}
                            // checkbox = {true}
                          />
                        ))}
                      <TableNoData isNotFound={tableData?.length === 0} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={data?.meta?.total}
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
        </>
      )}
    </>
  );
}

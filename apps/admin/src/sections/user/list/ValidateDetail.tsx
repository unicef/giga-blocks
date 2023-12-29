import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Container,
  Typography,
  TableContainer,
  Table,
  TableBody,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from '@components/snackbar';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_VALID } from '@routes/paths';
import { useValidDataGetById, useValidateUpdate } from '@hooks/validate/useValidate';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import ContributionDetailTableRow from './ContributionDetailTableRow';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
}
interface Profile {
  fullname: string,
  schoolName: string,
  createdAt: string,
  status: string,
  contributed_data: string,
  coverage: string,
  mintedStatus: string,
}

export default function ValidateDetail({ id }: Props) {
  const [profile, setProfile] = useState<Profile>({
    fullname: '',
    schoolName: '',
    createdAt: '',
    status: '',
    contributed_data: '',
    coverage: '',
    mintedStatus: '',
  });

  const { data, isSuccess, isError, refetch, isFetching } = useValidDataGetById(id);

  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState<any>();

  const {
    dense,
    page,
    order,
    orderBy,
    setPage,
    rowsPerPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const TABLE_HEAD = [
    { id: 'key', label: 'Key', align: 'left' },
    { id: 'value', label: 'Value', align: 'left' },
  ];

  const {
    mutate,
    isSuccess: isValidationSuccess,
    isError: isValidationError,
  } = useValidateUpdate();

  const router = useRouter();

  const [nftData, setNftData] = useState({
    id: '',
    schoolName: '',
    longitude: '',
    latitude: '',
    schoolType: '',
    country: '',
    connectivity: '',
    coverage_availabitlity: '',
    electricity_availabilty: '',
    mintedStatus: '',
    schoolId: '',
  });

  useEffect(() => {
    if (isSuccess) {
      const keyValue = Object?.entries(data?.data);
      var jsonString ;
      if(keyValue) 
      {jsonString = `${keyValue[0][0]}: ${keyValue[0][1]}`;
      const outputArray = Object?.keys(data?.data)?.map((key) => ({ key, value: data?.data[key] }));
      setTableData(outputArray);
      setProfile({
        fullname: data?.contributedUser?.name,
        schoolName: data?.school.name,
        createdAt: new Date(data?.createdAt)?.toLocaleDateString(),
        status: String(data?.approvedStatus),
        contributed_data: jsonString,
        coverage: data?.coverage_availability,
        mintedStatus: data?.minted,
      });}
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    isValidationSuccess && enqueueSnackbar('Successfully Approved', { variant: 'success' });
    refetch();
    isValidationError && enqueueSnackbar('Unsuccessful', { variant: 'error' });
  }, [isValidationSuccess, isValidationError]);

  useEffect(() => {
    setNftData({
      id: data?.id,
      schoolName: data?.name,
      longitude: data?.longitude,
      latitude: data?.latitude,
      schoolType: data?.school_type,
      country: data?.country,
      connectivity: data?.connectivity,
      coverage_availabitlity: data?.coverage_availability,
      electricity_availabilty: data?.electricity_available,
      mintedStatus: data?.minted,
      schoolId: data?.schoolId,
    });
  }, [data]);

  const methods = useForm();

  const onValidate = () => {
    mutate(data?.school_Id);
  };

  const sortedData = tableData?.slice()?.sort((a: any, b: any) => {
    const isAsc = order === 'asc';
    return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  });

  const back = () => {
    router.push('/valid');
  };

  return (
    <>
      <Grid item xs={8}>
        <Container>
          <CustomBreadcrumbs
            heading="Validation Detail"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Valid Data', href: PATH_VALID.root },
              { name: 'Detail' },
            ]}
          />
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} columnGap={2} display="grid">
                    <ProfileTextField
                      name="location"
                      value={profile?.schoolName || ''}
                      label="School Name"
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
                        value={profile?.createdAt || ''}
                        label="Created At"
                        disabled
                      />
                      <ProfileTextField
                        name="longitude"
                        value={profile?.status || ''}
                        label="Approved Status"
                        disabled
                      />
                    </Box>
                  </Box>

                  <Stack alignItems="flex-start" sx={{ mt: 3 }}>
                    <Button
                      onClick={back}
                      variant="contained"
                      style={{ width: '300px', background: '#474747' }}
                    >
                      Back
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Container>
      </Grid>
      <Grid item xs={4}>
        <Container>
          <Box justifyContent={'center'}>
            <Stack alignItems="center" sx={{ mt: 1 }}>
              {profile && profile?.status === 'false' &&
              <Button
                variant="contained"
                color={'info'}
                style={{ width: '300px', background: '#474747' }}
                onClick={onValidate}
              >
                Approve
              </Button>}
            </Stack>
          </Box>
        </Container>
      </Grid>
      <Grid xs={11} sx={{ margin: 'auto', marginTop: '50px' }}>
        <Typography variant="h6" component="h6">
          Contribution Detail
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
                />

                <TableBody>
                  {sortedData &&
                    sortedData.length > page*rowsPerPage && sortedData?.map((row: any) => (
                      <ContributionDetailTableRow
                        key={row?.id}
                        row={row}
                      />
                    ))}
                  {!isFetching ? (
                      <TableNoData isNotFound={sortedData?.length < page*rowsPerPage} />
                    ) : (
                      <CircularProgress color="inherit" />
                    )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={tableData?.length}
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
  );
}

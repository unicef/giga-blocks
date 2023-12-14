'use client';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Box,
  Button,
  Card,
  Tabs,
  Divider,
  TableContainer,
  Table,
  TableBody,
  FormControl,
  Autocomplete,
  TextField,
  Tab,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';
import { useSchoolGet } from '@hooks/school/useSchool';
import { useContributeGet, useContributionValidate } from '@hooks/contribute/useContribute';
import ContributeTableRow from '@sections/user/list/ContributTableRow';
import { useSnackbar } from '@components/snackbar';
import { useUserGet } from '@hooks/user/useUser';
import CustomTabPanel from '@components/Tabs';

type SearchItem = {
  label: string;
  value: string;
};

const ContributeData = () => {
  const TABLE_HEAD = [
    { id: 'name', label: 'Contributor name', align: 'left' },
    { id: 'school', label: 'School', align: 'left' },
    { id: 'contributed_data', label: 'Contributed Data', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'createdAt', label: 'Date', align: 'left' },
  ];

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

  const { enqueueSnackbar } = useSnackbar();

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [result] = useQuery({
    query: Queries.nftListQuery,
    variables: { skip: page * rowsPerPage, first: rowsPerPage },
  });
  const { data, fetching } = result;
  const {
    mutate,
    isSuccess: isValidationSuccess,
    isError: isValidationError,
  } = useContributionValidate();
  const [selectedSchoolSearch, setSelectedSchoolSearch] = useState<SearchItem | null>();
  const [selectedContributorSearch, setSelectedContributorSearch] = useState<SearchItem | null>();
  const { data: contributorList } = useUserGet(1, 10);
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const {
    data: ContributedData,
    isFetching,
    refetch,
  } = useContributeGet({
    page,
    perPage: rowsPerPage,
    schoolId: selectedSchoolSearch?.value,
    contributeId: selectedContributorSearch?.value,
    status: selectedStatus,
  });
  const { data: schoolList } = useSchoolGet({});

  const decodeSchooldata = (data: any) => {
    const encodeddata = data.tokenUris;
    const decodedShooldata = [];
    for (let i = 0; i < encodeddata?.length; i++) {
      const decodedData = atob(encodeddata[i].tokenUri.substring(29));
      const schoolData = {
        tokenId: encodeddata[i].id,
        ...JSON.parse(decodedData),
      };
      decodedShooldata.push(schoolData);
    }
    ContributedData?.rows &&
      ContributedData?.rows?.map((row: any) => {
        const contributedData = Object.entries(row?.contributed_data || {});
        const jsonString = JSON.parse(contributedData?.map((pair) => pair[1])?.join('') || '{}');
        const date = new Date(row.createdAt).toLocaleDateString();
        filteredData.push({
          id: row?.id,
          name: row?.contributedUser?.name || '',
          school: row?.school?.name || '',
          contributedDataKey: Object.keys(jsonString) || '',
          contributedDataValue: Object.values(jsonString) || '',
          date: date || '',
          status: row?.status || '',
        });
      });
    setTableData(filteredData);
  };

  useEffect(() => {
    refetch();
  }, [selectedSchoolSearch, selectedContributorSearch, selectedStatus]);

  let filteredData: any = [];
  useEffect(() => {
    if (data) decodeSchooldata(data);
  }, [data, isFetching]);

  const onSelectAllRows = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedValues(tableData);
    } else {
      setSelectedValues([]);
    }
  };

  let tempArray: object[] = [];
  const onContribute = (validity: boolean) => {
    refetch();
    selectedValues?.map((value: any) => {
      tempArray.push({ contributionId: value?.id, isValid: validity });
    });
    const payload = { contributions: tempArray };
    mutate(payload);
    refetch();
    tempArray = [];
  };

  useEffect(() => {
    isValidationSuccess &&
      enqueueSnackbar('Successfully updated contribution', { variant: 'success' });
    refetch();
    isValidationError && enqueueSnackbar('Unsuccessful', { variant: 'error' });
  }, [isValidationSuccess, isValidationError]);

  const handleValidChange = (value: string) => {
    setSelectedSchoolSearch(null);
    setSelectedContributorSearch(null);
    setSelectedStatus(value);
  };

  const sortedData = tableData.slice().sort((a: any, b: any) => {
    const isAsc = order === 'asc';
    return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  });

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSchoolSearchChange = (value: any) => {
    setSelectedContributorSearch(null);
    setSelectedSchoolSearch(value);
  };

  const handleContributorSearchChange = (value: any) => {
    setSelectedSchoolSearch(null);
    setSelectedContributorSearch(value);
  };

  const TabsDisplay = () => {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: 200 }}>
            <Autocomplete
              disablePortal
              value={selectedSchoolSearch?.label}
              options={schoolList?.rows?.map((school: any) => ({
                value: school.id,
                label: school.name,
              }))}
              renderInput={(params) => <TextField {...params} label="Search By School" />}
              onChange={(e, value) => {
                handleSchoolSearchChange(value);
              }}
            />
          </FormControl>
          <FormControl sx={{ width: 220, marginLeft: 2 }}>
            <Autocomplete
              disablePortal
              value={selectedContributorSearch?.label}
              options={contributorList?.rows?.map((contributor: any) => ({
                value: contributor.id,
                label: contributor.name,
              }))}
              renderInput={(params) => <TextField {...params} label="Search By Contributor" />}
              onChange={(e, value) => {
                handleContributorSearchChange(value);
              }}
            />
          </FormControl>
        </Box>
        {fetching && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        )}
        {!fetching && (
          <Card sx={{ marginTop: 2 }}>
            <Divider />
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                  {selectedStatus === 'Pending' && (
                    <TableHeadUsers
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tableData?.length}
                      showCheckBox={true}
                      onSort={onSort}
                      numSelected={selectedValues?.length}
                      onSelectAllRows={onSelectAllRows}
                    />
                  )}
                  {selectedStatus != 'Pending' && (
                    <TableHeadUsers
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tableData?.length}
                      showCheckBox={false}
                      onSort={onSort}
                      numSelected={selectedValues?.length}
                      onSelectAllRows={onSelectAllRows}
                    />
                  )}
                  <TableBody>
                    {sortedData &&
                      sortedData?.map((row: any) => (
                        <ContributeTableRow
                          key={row.id}
                          row={row}
                          selectedValues={selectedValues}
                          setSelectedValues={setSelectedValues}
                          rowData={row}
                          checkbox={true}
                        />
                      ))}
                    {!isFetching ? (
                      <TableNoData isNotFound={tableData?.length === 0} />
                    ) : (
                      <CircularProgress color="inherit" />
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={ContributedData?.meta?.total}
              // count={tableData?.length}
              setPage={setPage}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              dense={dense}
              onChangeDense={onChangeDense}
            />
          </Card>
        )}
      </>
    );
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>
          Contributed Data{' '}
          <span style={{ fontSize: '0.75em', fontWeight: '400' }}>
            {' '}
            {selectedValues?.length > 0 && `(${selectedValues?.length})`}{' '}
          </span>
        </span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button
            variant="contained"
            style={{ background: '#474747' }}
            disabled={selectedValues?.length <= 0}
            onClick={() => {
              onContribute(false);
              refetch();
            }}
          >
            Invalidate
          </Button>
          <Button
            variant="contained"
            style={{ background: '#474747' }}
            disabled={selectedValues?.length <= 0}
            onClick={() => {
              onContribute(true);
              refetch();
            }}
          >
            Validate
          </Button>
        </div>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pending" {...a11yProps(0)} onClick={() => handleValidChange('Pending')} />
          <Tab label="Validated" {...a11yProps(1)} onClick={() => handleValidChange('Validated')} />
          <Tab
            label="Invalidated"
            {...a11yProps(2)}
            onClick={() => handleValidChange('Rejected')}
          />
        </Tabs>
      </Box>
      <Box>
        <CustomTabPanel value={value} index={0}>
          <TabsDisplay />
        </CustomTabPanel>
      </Box>
      <Box>
        <CustomTabPanel value={value} index={1}>
          <TabsDisplay />
        </CustomTabPanel>
      </Box>
      <CustomTabPanel value={value} index={2}>
        <TabsDisplay />
      </CustomTabPanel>
    </DashboardLayout>
  );
};

export default ContributeData;

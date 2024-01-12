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
  Tab,
  TableRow,
  TableCell,
  TextField,
  FormControl,
  Autocomplete,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';
import { useSnackbar } from '@components/snackbar';
import { useValidateBulkUpdate, useValidateGet } from '@hooks/validate/useValidate';
import ValidateTableRow from '@sections/user/list/ValidateTableRow';
import CustomTabPanel from '@components/Tabs';
import { useAllSchool } from '@hooks/school/useSchool';

type SearchItem = {
  label: string;
  value: string;
};

type TableData = {
  id: string;
  school: string;
  isApproved: string;
  date: Date;
  schoolId: string;
}

const ValidateData = () => {
  const TABLE_HEAD = [
    { id: 'school', label: 'School', align: 'left' },
    { id: 'approved', label: 'Approval Status', align: 'left' },
    { id: 'createdAt', label: 'Date', align: 'left' },
  ];
  const [selectedSchoolSearch, setSelectedSchoolSearch] = useState<SearchItem | null>();
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
  } = useTable({defaultOrderBy: 'school', defaultOrder: 'desc'});

  const { enqueueSnackbar } = useSnackbar();

  const { data: schoolList } = useAllSchool();

  const [status, setStatus] = useState<string>('false');

  const [selectedValues, setSelectedValues] = useState<SearchItem[] | TableData[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);

  const {
    mutate,
    isSuccess: isValidationSuccess,
    isError: isValidationError,
    isLoading: isValidationLoading
  } = useValidateBulkUpdate();

  const { data: ValidatedData, isFetching, refetch } = useValidateGet(
    page,
    rowsPerPage,
    status,
    isValidationSuccess,
    selectedSchoolSearch?.value,
    order,
    orderBy
  );

  useEffect(() => {
    refetch()
  }, [selectedSchoolSearch, orderBy, order])

  let filteredData: any = [];
  useEffect(() => {
    ValidatedData &&
    ValidatedData?.rows?.map((row: any) => {
      const date = new Date(row?.createdAt).toLocaleDateString();
      filteredData.push({
        id: row.id,
        school: row.school.name,
        isApproved: String(row.approvedStatus),
        date: date,
        schoolId: row.school_Id,
      });
    });
  setTableData(filteredData);
  }, [isFetching])


  const onSelectAllRows = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedValues(tableData);
    } else {
      setSelectedValues([]);
    }
  };

  let payload: string[] = [];
  const onValidate = () => {
    selectedValues?.map((value: any) => {
      payload.push(value?.schoolId);
    });

    mutate(payload);
    payload = [];
    refetch()
    setSelectedValues([])
  };

  useEffect(() => {
    isValidationSuccess &&
      enqueueSnackbar('School Data are approved and updated in Database', { variant: 'success' });
    isValidationError && enqueueSnackbar('Try again', { variant: 'error' });
    isValidationLoading && enqueueSnackbar(' Data approval in progress. Please wait. ', { variant: 'warning' });
  }, [isValidationSuccess, isValidationError, isValidationLoading]);

  const handleSchoolSearchChange = (value: any) => {
    setSelectedSchoolSearch(value);
  };

  // const sortedData = tableData?.slice().sort((a:any, b:any) => {
  //   const isAsc = order === 'asc';
  //   return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  // });


  const TabsDisplay = () => {
    return (
      <>
        {isFetching && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        )}
        {!isFetching && (
          <>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: '20px'}}>
          <FormControl sx={{ width: 200 }}>
            <Autocomplete
              disablePortal
              value={selectedSchoolSearch?.label}
              options={schoolList?.map((school: any) => ({
                value: school.id,
                label: school.name,
              }))}
              renderInput={(params) => <TextField {...params} label="Search By School" />}
              onChange={(e, value) => {
                handleSchoolSearchChange(value);
              }}
            />
          </FormControl>
          </div>
          <Card style={{marginTop: '20px'}}>
            <Divider />
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                  <TableHeadUsers
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData?.length}
                    showCheckBox={status === 'true' ? false : true}
                    onSort={onSort}
                    numSelected={selectedValues?.length}
                    onSelectAllRows={onSelectAllRows}
                  />
                  <TableBody>
                    {isFetching ? (
                      <TableRow>
                        <TableCell sx={{ minWidth: '300px' }}>Loading data....</TableCell>
                      </TableRow>
                    ) : (
                      tableData &&
                      tableData?.map((row: any) => (
                        <ValidateTableRow
                          key={row.id}
                          row={row}
                          selectedValues={selectedValues}
                          setSelectedValues={setSelectedValues}
                          rowData={row}
                          checkbox={status === 'true' ? false : true}
                        />
                      ))
                    )}
                    <TableNoData isNotFound={tableData.length === 0} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={ValidatedData?.meta?.total}
              setPage={setPage}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              dense={dense}
              onChangeDense={onChangeDense}
              disablePageNumber
            />
          </Card>
          </>
        )}
      </>
    );
  };

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

  const handleApproveChange = (value: string) => {
    setStatus(value);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Valid Data</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button
            variant="contained"
            style={{ background: '#474747' }}
            disabled={selectedValues.length <= 0}
            onClick={onValidate}
          >
            Approve
          </Button>
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pending" {...a11yProps(1)} onClick={() => handleApproveChange('false')} />
          <Tab label="Approved" {...a11yProps(0)} onClick={() => handleApproveChange('true')} />
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
    </DashboardLayout>
  );
};

export default ValidateData;

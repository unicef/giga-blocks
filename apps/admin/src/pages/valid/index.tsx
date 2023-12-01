'use client';
import Scrollbar from '@components/scrollbar';
import {
  TableEmptyRows,
  TableHeadUsers,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '@components/table';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Box,
  Button,
  Card,
  Tabs,
  Divider,
  TableContainer,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  Tab,
} from '@mui/material';
import {CircularProgress} from '@mui/material';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';
import { useSchoolCount } from "@hooks/school/useSchool";
import { useContributeGet, useContributionValidate } from '@hooks/contribute/useContribute';
import ContributeTableRow from '@sections/user/list/ContributTableRow';
import { useSnackbar } from '@components/snackbar';
import { useValidateBulkUpdate, useValidateGet } from '@hooks/validate/useValidate';
import ValidateTableRow from '@sections/user/list/ValidateTableRow';
import CustomTabPanel from '@components/Tabs';

const ValidateData = () => {
  const TABLE_HEAD = [
    { id: 'school', label: 'School', align: 'left' },
    { id: 'isApproved', label: 'Approval Status', align: 'left' },
    // {id:'contributedData',label:'Contributed Data',align:'left'},
    { id: 'date', label: 'Date', align: 'left' }
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    setPage,
    rowsPerPage,
    onSelectRow,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState<string>("true")

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const{data:total} = useSchoolCount('MINTED');
  const[result] = useQuery({query:Queries.nftListQuery,variables:{skip:page*rowsPerPage,first:rowsPerPage}});
  const{data, fetching, error} = result;
  const {data:ValidatedData, refetch} = useValidateGet(page, rowsPerPage, status)

  const {mutate, isSuccess:isValidationSuccess, isError:isValidationError} = useValidateBulkUpdate()

  useEffect(() => {
    refetch()
  }, [status])

  const decodeSchooldata = (data:any) => {
    // const encodeddata = data.tokenUris;
    // const decodedShooldata = [];
    // for (let i = 0; i < encodeddata?.length; i++) {
    //   const decodedData = atob(encodeddata[i].tokenUri.substring(29));
    //   const schoolData = {
    //     tokenId: encodeddata[i].id,
    //     ...JSON.parse(decodedData),
    //   };
    //   decodedShooldata.push(schoolData);
    // }
    ValidatedData && ValidatedData?.rows.map((row: any) => {
      const date = new Date(row?.createdAt).toLocaleDateString();
      filteredData.push({
        id: row.id,
        school: row.school.name,
        isApproved: String(row.approvedStatus),
        date:date,
        schoolId: row.school_Id
      });
    }
    )
    setTableData(filteredData);
  };

  let filteredData: any = [];
  useEffect(() => {
    if(ValidatedData?.rows.length > 0) decodeSchooldata(ValidatedData);
  }, [ValidatedData]);

  const onSelectAllRows = (e:any) => {
    const isChecked = e.target.checked;
    if(isChecked){
      setSelectedValues(tableData)
    }
    else{
      setSelectedValues([])
    }
  }

  let payload:string[] = [];
  const onValidate = () => {
    selectedValues.map((value:any) => {
      payload.push(value?.schoolId)
    })

    mutate(payload)
    payload = [];
  }

  useEffect(() => {
    isValidationSuccess && enqueueSnackbar("Successfully updated contribution", { variant: 'success' })
    isValidationError && enqueueSnackbar("Unsuccessful", { variant: 'error' })
  }, [isValidationSuccess, isValidationError])

  const TabsDisplay = () => {
    return (
      <>
      {fetching && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </div>}
      {!fetching &&
      <Card>
        <Divider />
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
              <TableBody>
                {tableData &&
                  tableData.map((row: any) => (
                    <ValidateTableRow
                      key={row.id}
                      row={row}
                      selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}
                      rowData={row}
                      checkbox={true}
                    />
                  ))}
                <TableNoData
                  isNotFound={tableData.length === 0}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={ValidatedData?.meta?.total}
          // count={tableData?.length}
          setPage={setPage}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>}
      </>
    )
  }

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

  const handleApproveChange = (value:string) => {
    setStatus(value)
  }
  
  return (
    <DashboardLayout>
      <div style={{display: 'flex', justifyContent: 'space-between',marginBottom: '20px'}}>
          <span style={{fontSize: '1.5em', fontWeight: '600'}}>Valid Data</span>
          <div style={{display: 'flex', gap: '15px'}}>
          <Button variant="contained" style={{background: '#474747'}} disabled={selectedValues.length <= 0} onClick={onValidate}>Approve</Button>
          </div>
          </div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Approved" {...a11yProps(0)} onClick={() => handleApproveChange('true')}/>
          <Tab label="Not Approved" {...a11yProps(1)} onClick={() => handleApproveChange('false')}/>
        </Tabs>
        </Box>
        <Box>
        <CustomTabPanel value={value} index={0}>
        <TabsDisplay/>
        </CustomTabPanel>
        </Box>
        <Box>
        <CustomTabPanel value={value} index={1}>
        <TabsDisplay/>
        </CustomTabPanel>
        </Box>
        <CustomTabPanel value={value} index={2}>
        <TabsDisplay/>
        </CustomTabPanel>  
    </DashboardLayout>
  );
};

export default ValidateData;

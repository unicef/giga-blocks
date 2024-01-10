'use client';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import {
  Box,
  Card,
  Divider,
  TableContainer,
  Table,
  TableBody,
  FormControl,
  Autocomplete,
  TextField
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSchoolGet } from '@hooks/school/useSchool';
import { useContributionValidate } from '@hooks/contribute/useContribute';
import ContributeTableRow from '@sections/user/list/ContributTableRow';
import { useSnackbar } from '@components/snackbar';
import { useUserGet } from '@hooks/user/useUser';

type SearchItem = {
  label: string;
  value: string;
};

const TabsDisplay = ({setSelectedValues, selectedValues, ContributedData, refetch, isFetching, page, setPage, rowsPerPage, selectedStatus, onChangePage, onChangeRowsPerPage, setSelectedSchoolSearch, setSelectedContributorSearch}:{setSelectedValues: any, selectedValues: any, ContributedData:any, refetch:any, isFetching:any, page:any, setPage:any, rowsPerPage:any, selectedStatus: string, onChangePage:any, onChangeRowsPerPage: any, setSelectedSchoolSearch: any, setSelectedContributorSearch:any }) => {

  const [schoolName, setSchoolName] = useState<string>('');


  const { data: contributorList } = useUserGet(1, 10);
  const TABLE_HEAD = [
    { id: 'name', label: 'Contributor name', align: 'left' },
    { id: 'school', label: 'School', align: 'left' },
    { id: 'contributedDataKey', label: 'Type', align: 'left' },
    { id: 'contributedDataValue', label: 'Change', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'date', label: 'Date', align: 'left' },
  ];

    const selectChangeHandler = (e: any) => {
        setSchoolName(e.target.value)
        schoolListRefetch()
      }

      const handleSchoolSearchChange = (value: any) => {
        setSelectedContributorSearch(null);
        setSelectedSchoolSearch(value);
      };

      const handleContributorSearchChange = (value: any) => {
        setSelectedSchoolSearch(null);
        setSelectedContributorSearch(value);
      };

      const {
        dense,
        order,
        orderBy,
        onSort,
        onChangeDense
      } = useTable({defaultOrderBy: 'date', defaultOrder: 'desc'});
      const [toastMessage, setToastMessage] = useState('validated')
    
      const { enqueueSnackbar } = useSnackbar();

      const [tableData, setTableData] = useState<any>([]);
      
      const {
        mutate,
        isSuccess: isValidationSuccess,
        isError: isValidationError,
        isLoading: isValidationLoading
      } = useContributionValidate();
          
      const { data: schoolList, refetch:schoolListRefetch, isRefetching: schoolListRefetching } = useSchoolGet({page: 1, perPage: 8, name: schoolName});
    
      const decodeSchooldata = () => {
     
        ContributedData?.rows &&
          ContributedData?.rows?.map((row: any) => {
            const contributedData = Object.entries(row?.contributed_data || {});
            const jsonString = JSON.parse(contributedData?.map((pair) => pair[1])?.join('') || '{}');
            const date = new Date(row.updatedAt).toLocaleDateString();
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
    
      let filteredData: any = [];
      useEffect(() => {
        decodeSchooldata();
      }, [ isFetching]);
    
      const onSelectAllRows = (e: any) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          setSelectedValues(tableData);
        } else {
          setSelectedValues([]);
        }
      };
    
      useEffect(() => {
        isValidationSuccess &&
        enqueueSnackbar(`Contributed Data are ${toastMessage}. Please check ${toastMessage} Data Section`, { variant: 'success' });
        refetch();
        isValidationError && enqueueSnackbar('Error in validation, please try again.', { variant: 'error' });
        isValidationLoading && enqueueSnackbar('Data validation in progress. Please wait. ', { variant: 'warning' });
      }, [isValidationSuccess, isValidationError, isValidationLoading]);
    
      const sortedData = tableData.slice().sort((a: any, b: any) => {
        const isAsc = order === 'asc';
        if(orderBy === 'contributedDataKey'){
        return (a[orderBy][0] < b[orderBy][0] ? -1 : 1) * (isAsc ? 1 : -1);
        }
        else if(orderBy === 'contributedDataValue'){
          return
        }
        else{
        return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
        }
      }); 

    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: 200, marginRight: 2 }}>
            <Autocomplete
              disablePortal
              options={schoolList?.rows.map((school: any) => ({
                value: school.id,
                label: school.name,
              }))}
              renderInput={(params) => <TextField {...params} label="Search By School" />}
              onChange={(e, value) => {
                handleSchoolSearchChange(value);
              }}
              onInputChange={(value) => {selectChangeHandler(value);}}
            />
          </FormControl>
          <FormControl sx={{ width: 220 }}>
            <Autocomplete
              disablePortal
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
        {isValidationLoading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        )}
        {!isValidationLoading && (
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
                      rowCount={sortedData?.length}
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
                      rowCount={sortedData?.length}
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
                      <TableNoData isNotFound={sortedData?.length === 0} />
                    ) : (
                      <CircularProgress color="inherit" />
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={ContributedData?.meta?.total}
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
        )}
      </>
    );
  };

  export default TabsDisplay;
'use client';
import { useTable } from '@components/table';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Box,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useContributeGet, useContributionValidate } from '@hooks/contribute/useContribute';
import { useSnackbar } from '@components/snackbar';
import CustomTabPanel from '@components/Tabs';
import TabsDisplay from './tabsDisplay';

type SearchItem = {
  label: string;
  value: string;
};

const ContributeData = () => {

  const {
    page,
    setPage,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({defaultOrderBy: 'date', defaultOrder: 'desc'});
  const [toastMessage, setToastMessage] = useState('validated')

  const { enqueueSnackbar } = useSnackbar();

  const [selectedValues, setSelectedValues] = useState<any>([]);
  
  const [selectedSchoolSearch, setSelectedSchoolSearch] = useState<SearchItem | null>();

  const {
    mutate,
    isSuccess: isValidationSuccess,
    isError: isValidationError,
    isLoading: isValidationLoading
  } = useContributionValidate();
  const [selectedContributorSearch, setSelectedContributorSearch] = useState<SearchItem | null>();
  
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const {
    dense,
    order,
    orderBy,
    onSort,
    onChangeDense
  } = useTable({defaultOrderBy: 'school', defaultOrder: 'asc'});

  const tableValue = {dense, order, orderBy, onSort, onChangeDense}

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
    order,
    orderBy
  });

  let tempArray: object[] = [];
  const onContribute = (validity: boolean) => {
    refetch();
    selectedValues?.map((value: any) => {
      tempArray.push({ contributionId: value?.id, isValid: validity });
    });
    const payload = { contributions: tempArray };
    mutate(payload);
    !validity && setToastMessage('invalidated')
    refetch();
    setSelectedValues([])
    tempArray = [];
  };

  useEffect(() => {
    isValidationSuccess &&
    enqueueSnackbar(`Contributed Data are ${toastMessage}. Please check ${toastMessage} Data Section`, { variant: 'success' });
    refetch();
    isValidationError && enqueueSnackbar('Error in validation, please try again.', { variant: 'error' });
    isValidationLoading && enqueueSnackbar('Data validation in progress. Please wait. ', { variant: 'warning' });
  }, [isValidationSuccess, isValidationError, isValidationLoading]);

  const handleValidChange = (value: string) => {
    setSelectedSchoolSearch(null);
    setSelectedContributorSearch(null);
    setSelectedStatus(value);
  };

  useEffect(() => {
    refetch();
  }, [selectedStatus, selectedSchoolSearch, selectedContributorSearch, order, orderBy]);

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

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>
          Contributions{' '}
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
        <TabsDisplay 
        onChangeRowsPerPage={onChangeRowsPerPage} 
        onChangePage={onChangePage} 
        selectedStatus={selectedStatus} 
        page={page} 
        setPage={setPage} 
        rowsPerPage={rowsPerPage} 
        refetch={refetch} 
        isFetching={isFetching} 
        ContributedData={ContributedData} 
        setSelectedValues={setSelectedValues} 
        selectedValues={selectedValues} 
        setSelectedSchoolSearch={setSelectedSchoolSearch} 
        setSelectedContributorSearch={setSelectedContributorSearch}
        tableValue={tableValue}
        />
        </CustomTabPanel>
      </Box> 
      <Box>
        <CustomTabPanel value={value} index={1}>
        <TabsDisplay onChangeRowsPerPage={onChangeRowsPerPage} onChangePage={onChangePage} selectedStatus={selectedStatus} page={page} setPage={setPage} rowsPerPage={rowsPerPage} refetch={refetch} isFetching={isFetching} ContributedData={ContributedData} setSelectedValues={setSelectedValues} selectedValues={selectedValues} setSelectedSchoolSearch={setSelectedSchoolSearch} setSelectedContributorSearch={setSelectedContributorSearch} tableValue={tableValue}/>
        </CustomTabPanel>
      </Box>
      <CustomTabPanel value={value} index={2}>
      <TabsDisplay onChangeRowsPerPage={onChangeRowsPerPage} onChangePage={onChangePage} selectedStatus={selectedStatus} page={page} setPage={setPage} rowsPerPage={rowsPerPage} refetch={refetch} isFetching={isFetching} ContributedData={ContributedData} setSelectedValues={setSelectedValues} selectedValues={selectedValues} setSelectedSchoolSearch={setSelectedSchoolSearch} setSelectedContributorSearch={setSelectedContributorSearch} tableValue={tableValue}/>
      </CustomTabPanel>
    </DashboardLayout>
  );
};

export default ContributeData;
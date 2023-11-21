'use client';
import Iconify from '@components/iconify';
import Scrollbar from '@components/scrollbar';
import {
  TableEmptyRows,
  TableHeadUsers,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '@components/table';
import { useSchoolGet } from '@hooks/school/useSchool';
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
  TextField,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { JsonRpcProvider, Signer } from 'ethers';
import { mintSignature } from '@components/web3/utils/wallet';
import { useBulkMintSchools } from '@hooks/school/useSchool';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from '@components/snackbar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Input } from '@mui/material';

const VerifiedSchool = () => {

    const TABLE_HEAD = [
        // { id: 'checkbox', label: '', align: 'left' },
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'location', label: 'Location', align: 'left' },
        { id: 'latitide', label: 'Latitude', align: 'left' },
        { id: 'longitude', label: 'Longitude', align: 'left' },
        { id: 'status', label: 'Status', align: 'left' }
      ];

      const { enqueueSnackbar } = useSnackbar();

      const {push, query} = useRouter()

      const uploadId = query.uploadId;

      const {dense, page, setPage, order, orderBy, rowsPerPage, onChangePage, onSelectRow, onSort, onChangeDense, onChangeRowsPerPage,
      } = useTable();

      const [age, setAge] = useState('');

      const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };

  const {
    mutate,
    isError: isMintError,
    data: mintData,
    isSuccess: isMintSuccess,
    error: mintingError,
  } = useBulkMintSchools();

  const provider = useWeb3React();

  // const { filteredUsers } = useAdministrationContext();
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [country, setCountry] = useState<string>()
  const [connectivity, setConnectivity] = useState<string>()
  const { data, isLoading, refetch } = useSchoolGet({page, perPage: rowsPerPage, minted: 'NOTMINTED', uploadId, country, connectivity});

  // const { error } = useFetchUsers();

  useEffect(() => {
    console.log(connectivity)
    refetch()
  }, [uploadId, country, connectivity])

  let filteredData: any = [];
  useEffect(() => {
    !isLoading &&
    data?.rows &&  data?.rows.map((row: any) => {
        filteredData.push({
          id: row.id,
          schoolName: row.name,
          longitude: row.longitude,
          latitude: row.latitude,
          schoolType: row.school_type,
          country: row.country,
          connectivity: row.connectivity,
          coverage_availabitlity: row.coverage_availability,
          electricity_availabilty: row.electricity_available,
          mintedStatus: row.minted,
        });
      });

    setTableData(filteredData);
  }, [data, isLoading, uploadId]);

    const signTransaction = useCallback(async () =>{
      try {
      const signer = (provider.provider as unknown as JsonRpcProvider).getSigner() as unknown as Signer;
      const signature = await mintSignature(signer, selectedValues.length);
      return signature;
      }
      catch(err) {
        enqueueSnackbar(err.message, { variant: 'error' })
      }
    },[provider,selectedValues])
  
    const mintSchool = useCallback(async () => {
      if(selectedValues.length === 0){
        enqueueSnackbar("Please select atleast one school", { variant: 'error' })
        return Error("Please select atleast one school");
      }
      if(!provider.provider) return;
      const signature = await signTransaction();
      if(!signature){
        enqueueSnackbar("Signature is null", { variant: 'error' })
        return Error("Signature is null");
      } 
      setSelectedValues([])
      mutate({data:selectedValues, signatureWithData:signature})
    },[signTransaction,selectedValues])

    let test;
    const onSelectAllRows = (e:any) => {
      const isChecked = e.target.checked;
      test = isChecked
      if(isChecked){
        setSelectedValues(tableData)
      }
      else{
        setSelectedValues([])
      }
    }

    const uploadSchool = () => {
      push('/school/import')
    }

    const sortedData = tableData.slice().sort((a:any, b:any) => {
      const isAsc = order === 'asc';
      return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
    });

    const handleSearchChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCountry(e.target.value)
    }

    const handleSearchConnectivity = (event:any) => {
      setConnectivity(event.target.value as string);
    }

    return ( 
        <DashboardLayout>
          <div style={{display: 'flex', justifyContent: 'space-between',marginBottom: '20px'}}>
          <span style={{fontSize: '1.5em', fontWeight: '600'}}>Unminted School</span>
          <div style={{display: 'flex', gap: '15px'}}>
          <Button variant="contained" style={{background: '#474747'}} onClick={mintSchool}>Mint ({selectedValues.length})</Button>
          <Button variant="contained" style={{background: '#404040'}} onClick={uploadSchool}>Import School</Button>
          </div>
          </div>
          
          {uploadId && <span style={{color: '#008000', fontSize: '0.85em'}}>Recently imported school, <span onClick={() => push(`/school/un-minted`)} style={{color: '#795CB2', cursor: 'pointer'}}>List all</span></span>}

          <div style={{display: 'flex', alignItems: 'flex-end', gap: '20px'}}>
          <TextField id="outlined-basic" type='string' placeholder='Search country' onChange={(e) => handleSearchChange(e)}/>
          <FormControl sx={{width: 150}}>
            <InputLabel id="demo-simple-select-label">Connectivity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"Connectivity"}
              label="Search"
              onChange={handleSearchConnectivity}
            >
              <MenuItem value={'true'}>True</MenuItem>
              <MenuItem value={'false'}>False</MenuItem>
            </Select>
          </FormControl>
          </div>
          <Card sx={{marginTop: 2}}>
         
          <Divider />
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
                  numSelected={selectedValues?.length}
                  onSelectAllRows={onSelectAllRows}
                />

                <TableBody>
                  {sortedData &&
                    sortedData.map((row:any) => (
                      <SchoolTableRow
                        key={row.id}
                        row={row}
                        selectedValues={selectedValues}
                        setSelectedValues={setSelectedValues}
                        rowData = {row}
                        checkbox = {true}
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
        </DashboardLayout>
     );
}
 
export default VerifiedSchool;

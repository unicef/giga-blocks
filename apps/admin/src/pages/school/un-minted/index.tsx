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
} from '@mui/material';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { JsonRpcProvider, Signer } from 'ethers';
import { mintSignature } from '@components/web3/utils/wallet';
import { useBulkMintSchools } from '@hooks/school/useSchool';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from '@components/snackbar';

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

      const {push} = useRouter()

      const {dense, page, setPage, order, orderBy, rowsPerPage, onChangePage, onSelectRow, onSort, onChangeDense, onChangeRowsPerPage,
      } = useTable();

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
  const { data, isLoading } = useSchoolGet(page, rowsPerPage, 'NOTMINTED');

  // const { error } = useFetchUsers();

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
  }, [data, isLoading]);

    const signTransaction = async () =>{
      try {
      const signer = (provider.provider as unknown as JsonRpcProvider).getSigner() as unknown as Signer;
      const signature = await mintSignature(signer, selectedValues.length);
      return signature;
      }
      catch(err) {
        enqueueSnackbar(err.message, { variant: 'error' })
      }
    }
  
    const mintSchool = async () => {
      const signature = await signTransaction();
      if(!signature){
        enqueueSnackbar("Signature is null", { variant: 'error' })
        return Error("Signature is null");
      } 
      setSelectedValues([])
      mutate({data:selectedValues, signatureWithData:signature})
    }

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
      push('/upload')
    }

    return ( 
        <DashboardLayout>
          <div style={{display: 'flex', justifyContent: 'space-between',marginBottom: '20px'}}>
          <span style={{fontSize: '1.5em', fontWeight: '600'}}>Unminted School</span>
          <Button variant="contained" style={{background: '#474747'}} onClick={mintSchool}>Mint ({selectedValues.length})</Button>
          <Button variant="contained" style={{background: '#474747'}} onClick={uploadSchool}>Upload School</Button>
          </div>
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
                  onSort={onSort}
                  showCheckBox={true}
                  numSelected={selectedValues?.length}
                  onSelectAllRows={onSelectAllRows}
                />

                <TableBody>
                  {tableData &&
                    tableData.map((row:any) => (
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

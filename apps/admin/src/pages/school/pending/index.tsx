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
import { useEffect, useState } from 'react';
import { hooks } from '@hooks/web3/metamask';
import { JsonRpcProvider, Signer } from 'ethers';
import { mintSignature } from '@components/web3/utils/wallet';
import { useBulkMintSchools } from '@hooks/school/useSchool';
import { useWeb3React } from '@web3-react/core';

const VerifiedSchool = () => {
  const TABLE_HEAD = [
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'location', label: 'Location', align: 'left' },
    { id: 'latitide', label: 'Latitude', align: 'left' },
    { id: 'longitude', label: 'Longitude', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSelectRow,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const {
    mutate,
    isError: isMintError,
    data: mintData,
    isSuccess: isMintSuccess,
  } = useBulkMintSchools();

  const { useProvider } = hooks;
  const provider = useWeb3React();

  // const { filteredUsers } = useAdministrationContext();
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const { data } = useSchoolGet(page, rowsPerPage, 'ISMINTING');

  // const { error } = useFetchUsers();

  let filteredData: any = [];
  useEffect(() => {
    data?.rows &&
      data?.rows.map((row: any) => {
        filteredData.push({
          id: row.id,
          schoolName: row.name,
          longitude: row.longitude,
          latitude: row.latitude,
          schoolType: row.school_type,
          country: row.country,
          connectivity: row.connectivity_speed_status,
          coverage_availabitlity: row.connectivity_speed_status,
          electricity_availabilty: row.electricity_available,
          mintedStatus: row.minted,
        });
      });

    setTableData(filteredData);
  }, [data]);

  const signTransaction = async () => {
    const signer = (
      provider.provider as unknown as JsonRpcProvider
    ).getSigner() as unknown as Signer;
    const signature = await mintSignature(signer, selectedValues.length);
    return signature;
  };

  const mintSchool = async () => {
    const signature = await signTransaction();
    if (!signature) return Error('Signature is null');
    setSelectedValues([]);
    mutate({ data: selectedValues, signatureWithData: signature });
  };

  return (
    <DashboardLayout>
      <h2>Minting School</h2>
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
              />

              <TableBody>
                {tableData &&
                  tableData.map((row: any) => (
                    <SchoolTableRow
                      key={row.id}
                      row={row}
                      selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}
                      rowData={row}
                      checkbox={false}
                    />
                  ))}
                <TableNoData isNotFound={false} />
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
};

export default VerifiedSchool;

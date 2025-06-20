'use client';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import { useSchoolGetImageUpdateList, useUpdateSchoolImage } from '@hooks/school/useSchool';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import { Button, Card, Divider, TableContainer, Table, TableBody } from '@mui/material';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { useRouter } from 'next/compat/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { JsonRpcProvider, Signer } from 'ethers';
import { mintSignature } from '@components/web3/utils/wallet';
import { useWeb3React } from '@web3-react/core';
import useDebounce from '@hooks/useDebounce';
import { NextRouter } from 'next/router';
import { useSnackbar } from '@components/snackbar';

const PendingSchool = () => {
  const TABLE_HEAD = [
    { id: 'name', label: 'School name', align: 'left' },
    { id: 'country', label: 'Location', align: 'left' },
    { id: 'latitude', label: 'Latitude', align: 'left' },
    { id: 'longitude', label: 'Longitude', align: 'left' },
    { id: 'imageHash', label: 'Image Hash', align: 'left' },
  ];

  const { push, query } = useRouter() as NextRouter;

  const [school, setSchool] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();

  const {
    dense,
    page,
    setPage,
    order,
    orderBy,
    rowsPerPage,
    onChangePage,
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createdAt', defaultOrder: 'desc' });

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const { data, isLoading, refetch, isFetching } = useSchoolGetImageUpdateList({
    page: Number(page) + 1,
    perPage: rowsPerPage,
  });
  const updateImageHash = useUpdateSchoolImage({
    onSuccess: () => {
      enqueueSnackbar('Data added in the queue sucessfully!', { variant: 'success' });
      refetch();
    },
    onError: () => {
      enqueueSnackbar('Failed to add data in the queue', { variant: 'error' });
    },
  });

  let filteredData: any = [];
  useEffect(() => {
    !isLoading &&
      data?.rows &&
      data?.rows?.map((row: any) => {
        filteredData.push({
          id: row.id,
          schoolName: row.name,
          longitude: row.longitude,
          latitude: row.latitude,
          country: row.country,
          imageHash: row.imageHash,
        });
      });

    setTableData(filteredData);
  }, [data, isLoading]);

  const onClickUpdateImageHash = () => {
    updateImageHash.mutate();
  };

  const handleSchoolChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSchool(e.target.value);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Schools To Be Updated</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button
            variant="contained"
            disabled={isLoading || tableData.length === 0}
            onClick={onClickUpdateImageHash}
          >
            Update Image Hash
          </Button>
        </div>
      </div>
      <Card sx={{ marginTop: 2 }}>
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
              />

              <TableBody>
                {tableData &&
                  tableData?.map((row: any) => (
                    <SchoolTableRow
                      key={row.id}
                      row={row}
                      selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}
                      rowData={row}
                      checkbox={false}
                      clickable={false}
                    />
                  ))}
                <TableNoData isNotFound={tableData.length === 0} isFetching={isFetching} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={data?.meta?.total || 0}
          page={page || 0}
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

export default PendingSchool;

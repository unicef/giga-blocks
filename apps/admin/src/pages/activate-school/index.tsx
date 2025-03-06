'use client';
import ActiveDialog from '@components/active-dialog';
import Scrollbar from '@components/scrollbar';
import { useSnackbar } from '@components/snackbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import { useBulkMintSchools, useSchoolGet } from '@hooks/school/useSchool';
import useDebounce from '@hooks/useDebounce';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import { Button, Card, Divider, Table, TableBody, TableContainer, TextField } from '@mui/material';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

const ActivateSchool = () => {
  const TABLE_HEAD = [
    { id: 'link', label: 'Link', align: 'left' },
    { id: 'startDate', label: 'Start Date', align: 'left' },
    { id: 'endDate', label: 'End Date', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
  ];

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

  const provider = useWeb3React();
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [country, setCountry] = useState<string>();
  const { data, isLoading, refetch, isFetching } = useSchoolGet({
    page,
    perPage: rowsPerPage,
    country,
    order,
    orderBy,
  });

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Activate Schools</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <ActiveDialog />
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
                      checkbox={true}
                    />
                  ))}
                <TableNoData isNotFound={tableData.length === 0} isFetching={isFetching} />
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

export default ActivateSchool;

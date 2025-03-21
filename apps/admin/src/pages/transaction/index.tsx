'use client';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, useTable, TableNoData, TablePaginationCustom } from '@components/table';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Queries } from 'src/libs/graph-query';
import { useQuery } from 'urql';

const TABLE_HEAD = [
  { id: 'blockNumber', label: 'Block Number', align: 'left' },
  { id: 'blockTimestamp', label: 'Block Timestamp', align: 'left' },
  { id: 'from', label: 'From', align: 'left' },
  { id: 'to', label: 'To', align: 'left' },
  { id: 'tokenId', label: 'Token Id', align: 'left' },
  { id: 'transactionHash', label: 'Transaction Hash', align: 'left' },
];

const Transaction = () => {
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
  } = useTable({
    defaultOrderBy: 'createdAt',
    defaultOrder: 'desc',
  });
  const [tableData, setTableData] = useState<any>([]);
  const [paginatedData, setPaginatedData] = useState<any>([]);

  const [result] = useQuery({
    query: Queries.nftTransfer,
    variables: {},
  });
  const { data, fetching } = result;
  const combinedTransfers = [...(data?.schoolTransfers || []), ...(data?.collectorTransfers || [])];

  useEffect(() => {
    setTableData(combinedTransfers || []);
  }, [combinedTransfers]);

  useEffect(() => {
    const startItem = (page + 1) * rowsPerPage - rowsPerPage;
    const endItem = page * rowsPerPage + rowsPerPage;
    const newData = combinedTransfers.sort((a: any, b: any) => b.id - a.id);
    const paginatedDatas = newData?.slice(startItem, endItem);
    setPaginatedData(paginatedDatas);
  }, [rowsPerPage, data, page]);

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Transaction</span>
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
                rowCount={tableData.length}
                onSort={onSort}
                showCheckBox={true}
              />

              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell scope="row">{row.blockNumber}</TableCell>
                      <TableCell scope="row">{row.blockTimestamp}</TableCell>
                      <TableCell scope="row">
                        {row.from.slice(0, 4) + '...' + row.from.slice(-8)}
                      </TableCell>
                      <TableCell scope="row">
                        {row.from.slice(0, 4) + '...' + row.from.slice(-8)}
                      </TableCell>
                      <TableCell scope="row" align="center">
                        {row.tokenId}
                      </TableCell>
                      <TableCell scope="row">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_TRANSACTION_HASH}/tx/${row.transactionHash}`}
                          target="_blank"
                        >
                          {row.transactionHash.slice(0, 4) + '...' + row.transactionHash.slice(-8)}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableNoData isNotFound={true} isFetching={fetching} />
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={combinedTransfers?.length || 0}
          setPage={setPage}
          page={page}
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

export default Transaction;

'use client';
import ActiveDialog from '@components/active-dialog';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, useTable } from '@components/table';
import { useActivateSchool } from '@hooks/school/useSchool';
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
import { useState } from 'react';

const TABLE_HEAD = [
  { id: 'link', label: 'Link', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'startDate', label: 'Start Date', align: 'left' },
  { id: 'endDate', label: 'End Date', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
];

const ActivateSchool = () => {
  const { dense, order, orderBy, onSort } = useTable({
    defaultOrderBy: 'createdAt',
    defaultOrder: 'desc',
  });

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const { data, isFetching } = useActivateSchool();
  const tableData = Array.isArray(data) ? data : [];
  const BASE_URL = process.env.NEXT_PUBLIC_WEB_NAME;
  console.log('tableData', tableData);

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Manage Event Links</span>
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
                rowCount={tableData.length}
                onSort={onSort}
                showCheckBox={true}
                numSelected={selectedValues.length}
              />

              <TableBody>
                {tableData.length > 0 ? (
                  tableData.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell scope="row">
                        <a href={`${BASE_URL}${row.id}`}>{`${BASE_URL}${row.id}`}</a>
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {new Date(row.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">
                        {new Date(row.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableNoData isNotFound={true} isFetching={isFetching} />
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </DashboardLayout>
  );
};

export default ActivateSchool;

'use client';
import ActiveDialog from '@components/active-dialog';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, useTable } from '@components/table';
import { useActivateSchool } from '@hooks/school/useSchool';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import { Card, Divider, Table, TableBody, TableContainer } from '@mui/material';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { useEffect, useState } from 'react';

const TABLE_HEAD = [
  { id: 'link', label: 'Link', align: 'left' },
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
                rowCount={tableData.length}
                onSort={onSort}
                showCheckBox={true}
                numSelected={selectedValues.length}
              />

              <TableBody>
                {tableData.length > 0 ? (
                  tableData.map((row: any) => (
                    <tr key={row.id}>
                      <td style={{ padding: '12px' }}>{row.id}</td>
                      <td>{new Date(row.startDate).toLocaleDateString()}</td>
                      <td>{new Date(row.endDate).toLocaleDateString()}</td>
                      <td>{row.status}</td>
                    </tr>
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

'use client';
import Scrollbar from '@components/scrollbar';
import {
  TableHeadUsers,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from '@components/table';
import { useSchoolGet } from '@hooks/school/useSchool';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Card,
  Tabs,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TextField
} from '@mui/material';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { ChangeEvent, useEffect, useState } from 'react';

const VerifiedSchool = () => {
  const TABLE_HEAD = [
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'location', label: 'Location', align: 'left' },
    { id: 'latitude', label: 'Latitude', align: 'left' },
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
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({defaultOrder: 'asc', defaultOrderBy: 'name'});

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [country, setCountry] = useState<string>()
  const [connectivity] = useState<string>()
  const { data, refetch, isFetching } = useSchoolGet({page, perPage: rowsPerPage, minted: 'ISMINTING', country, connectivity, order, orderBy});

  let filteredData: any = [];
  useEffect(() => {
    data?.rows &&
      data?.rows?.map((row: any) => {
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

  useEffect(() => {
    refetch()
  }, [order, orderBy])

  return (
    <DashboardLayout>
      <h2>Minting In Progress</h2>
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

export default VerifiedSchool;

'use client';

import React from 'react';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from '@mui/material';
import { useReservedSchoolList } from '@hooks/school/useSchool';
import { TablePaginationCustom, useTable } from '@components/table';

const SchoolList: React.FC = () => {
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable({
    defaultOrderBy: 'SchoolClaimed',
    defaultOrder: 'desc',
  });
  const { data, isFetching } = useReservedSchoolList({
    page: Number(page) + 1,
    perPage: rowsPerPage,
  });

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <Box mt={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School Name</TableCell>
              <TableCell>ImageHash</TableCell>
              <TableCell>SchoolClaimed</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contributor Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <>
                <TableRow>
                  <TableCell colSpan={6} sx={{ p: 3, textAlign: 'center' }}>
                    No reserved schools found.
                  </TableCell>
                </TableRow>
              </>
            ) : (
              data?.rows?.map((data: any) => (
                <TableRow key={data.id} hover>
                  <TableCell>{data?.school?.name}</TableCell>
                  <TableCell>{data?.school?.imageHash}</TableCell>
                  <TableCell>{data?.school?.schoolClaimed ? 'Claimed' : 'Not Claimed'}</TableCell>
                  <TableCell>{data?.contributor?.user?.email}</TableCell>
                  <TableCell>{data?.contributor?.user?.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div style={{ justifyContent: 'right', marginTop: '20px' }}>
          <TablePaginationCustom
            count={data?.meta?.total || 0}
            page={page || 0}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            setPage={setPage}
          />
        </div>
      </Box>
    </Box>
  );
};

export default SchoolList;

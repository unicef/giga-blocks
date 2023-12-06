import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@carbon/react';
import { useContributeDetails } from '../../hooks/useContributionList';

const ChangeLog = ({ schoolid }) => {
  const { data, refetch } = useContributeDetails(schoolid);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.rows?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.meta?.total / itemsPerPage);

  useEffect(() => {
    refetch({ page: currentPage - 1, perPage: itemsPerPage });
  }, [currentPage, itemsPerPage]);

  return (
    <TableContainer sx={{ my: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                whiteSpace: 'nowrap',
                color: 'white',
              }}
              style={{ background: '#2c2b33', color: '#ffff' }}
            >
              {'Field Type'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Change'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Contributor'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Date of change'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Data Status'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.rows?.length === 0 || !data ? (
            <TableRow>
              <TableCell colSpan={6}>No contribution made yet.</TableCell>
            </TableRow>
          ) : (
            data?.rows?.map((contribution) => {
              const contributedData = JSON.parse(
                contribution?.contributed_data
              );
              return Object.entries(contributedData).map(
                ([fieldType, change]) => (
                  <TableRow key={contribution?.id + fieldType}>
                    <TableCell>{fieldType}</TableCell>
                    <TableCell>{change.toString()}</TableCell>
                    <TableCell>{contribution?.contributedUser?.name}</TableCell>
                    <TableCell>
                      {contribution?.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell>{contribution?.status}</TableCell>
                  </TableRow>
                )
              );
            })
          )}
        </TableBody>
      </Table>
      <Pagination
        totalItems={data?.meta?.total || 0}
        page={currentPage}
        pageSize={itemsPerPage}
        pageSizes={[10, 20, 30, 40, 50]}
        onChange={({ page, pageSize }) => {
          setCurrentPage(page);
          setItemsPerPage(pageSize);
        }}
        style={{ background: '#2C2B33', color: 'white' }}
      />
    </TableContainer>
  );
};

export default ChangeLog;

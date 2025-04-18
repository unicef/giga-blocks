'use client';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, TablePaginationCustom, useTable } from '@components/table';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Card,
  Divider,
  TableContainer,
  Table,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';
import { ethers } from 'ethers';

const MintedSchools = () => {
  const TABLE_HEAD = [
    { id: 'schoolName', label: 'Name', align: 'left' },
    { id: 'country', label: 'Location', align: 'left' },
    { id: 'latitude', label: 'Latitude', align: 'left' },
    { id: 'longitude', label: 'Longitude', align: 'left' },
    { id: 'mintedStatus', label: 'Status', align: 'left' },
    { id: 'tokenId', label: 'TokenId', align: 'left' },
    { id: 'mintedAt', label: 'Minted At', align: 'left' },
    { id: 'gasFee', label: 'Gas Fee (ETH)', align: 'left' },
  ];

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
  } = useTable();

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<String>('all');

  const [result] = useQuery({
    query: Queries.allNftListQuery,
    variables: { first: rowsPerPage, skip: rowsPerPage*page },
    pause: selectedFilter !== 'all',
  });
  const { data, fetching } = result;

  const [adminResult] = useQuery({
    query: Queries.adminNftListQuery,
    variables: { id: process.env.NEXT_PUBLIC_ADMIN_ADDRESS,first: rowsPerPage, skip: rowsPerPage*page },
    pause: selectedFilter !== 'admin',
  });
  const { data: adminData } = adminResult;

  const [otherResult] = useQuery({
    query: Queries.othersNftListQuery,
    variables: { id: process.env.NEXT_PUBLIC_ADMIN_ADDRESS,first: rowsPerPage, skip: rowsPerPage*page },
    pause: selectedFilter !== 'others',
  });
  const { data: otherData } = otherResult;

  useEffect(() => {
    let selectedData;

    if (selectedFilter === 'admin') {
      selectedData = adminData?.nftDatas || [];
    } else if (selectedFilter === 'others') {
      selectedData = otherData?.nftDatas || [];
    } else {
      selectedData = data?.nftDatas || [];
    }


    const decodedShooldata: any = selectedData.map((data: any) => {
      let decodedData = atob(data?.tokenUri?.substring(29));
      return {
        id: Number(data.tokenId),
        mintedAt: data.mintedAt,
        ...JSON.parse(decodedData),
        mintedStatus: 'MINTED',
        gasFee: ethers.formatEther(data.mintingGasFee),
      };
    }, []);

    setTableData(decodedShooldata);
  }, [selectedFilter, data, adminData, otherData, page, rowsPerPage]);

  const sortedData = tableData?.slice().sort((a: any, b: any) => {
    const isAsc = order === 'asc';
    if (orderBy === 'longitude') {
      return (parseFloat(a[orderBy]) < parseFloat(b[orderBy]) ? -1 : 1) * (isAsc ? 1 : -1);
    }
    return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  });

  return (
    <DashboardLayout>
      <h2>Minted School</h2>
      <FormControl sx={{ width: '25%' }}>
        <InputLabel id="demo-simple-select-label">Minted By</InputLabel>
        <Select
          labelId="minted-by-select-label"
          id="minted-by-select"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </Select>
      </FormControl>
      {fetching && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
      {!fetching && (
        <>
          <Card style={{ marginTop: '20px' }}>
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
                    {sortedData &&
                      sortedData?.map((row: any) => (
                        <SchoolTableRow
                          key={row.id}
                          row={row}
                          selectedValues={selectedValues}
                          setSelectedValues={setSelectedValues}
                          rowData={row}
                          checkbox={false}
                        />
                      ))}
                    <TableNoData isNotFound={tableData.length === 0} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
              <FormControl sx={{ width: '150px' }}>
                <InputLabel id="rows-per-page-select-label">Rows Per Page</InputLabel>
                <Select
                  labelId="rows-per-page-select-label"
                  id="rows-per-page-select"
                  value={rowsPerPage}
                  onChange={(e) => onChangeRowsPerPage(e as React.ChangeEvent<HTMLInputElement>)} // Update rowsPerPage
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={() => {
                  setPage((prevPage) => prevPage + 1); // Increment the page number
                }}
                disabled={fetching || tableData.length === 0} // Disable if fetching or no data
              >
                Next
              </Button>
            </Box>
            {/* <TablePaginationCustom
              count={data?.nftDatas?.length || 0}
              setPage={setPage}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              dense={dense}
              onChangeDense={onChangeDense}
              disablePageNumber={true}
            /> */}
          </Card>
        </>
      )}
    </DashboardLayout>
  );
};

export default MintedSchools;

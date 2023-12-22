'use client';
import Scrollbar from '@components/scrollbar';
import {
  TableHeadUsers,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from '@components/table';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Card,
  Divider,
  TableContainer,
  Table,
  TableBody
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SchoolTableRow from '@sections/user/list/SchoolTableRow';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';

const MintedSchools = () => {
  const TABLE_HEAD = [
    { id: 'schoolName', label: 'Name', align: 'left' },
    { id: 'country', label: 'Location', align: 'left' },
    { id: 'latitude', label: 'Latitude', align: 'left' },
    { id: 'longitude', label: 'Longitude', align: 'left' },
    { id: 'mintedStatus', label: 'Status', align: 'left' },
    { id: 'tokenId', label: 'TokenId', align: 'left' },
    { id: 'mintedAt', label: 'Minted At', align: 'left' },
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
  } = useTable({defaultOrderBy: 'tokenId', defaultOrder: 'desc'});

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [paginatedData, setPaginatedData] = useState<any>([])
  const [result] = useQuery({
    query: Queries.nftListQuery,
    variables: {  },
  });
  const { data, fetching } = result;
  
  useEffect(() => {
    const startItem = (page+1)*rowsPerPage - rowsPerPage;
    const endItem = page*rowsPerPage + rowsPerPage
    const paginatedDatas = data?.schoolTokenUris.slice(startItem , endItem);
    setPaginatedData(paginatedDatas)
  }, [rowsPerPage, data, page])

  const decodeSchooldata = (data: any) => {
    const encodeddata = data;  
    const decodedShooldata = [];
    for (let i = 0; i < encodeddata.length; i++) {
      const decodedData = atob(encodeddata[i].tokenUri.substring(29));
      const schoolData = {
        tokenId: encodeddata[i].id,
        mintedAt: encodeddata[i].mintedAt,
        ...JSON.parse(decodedData),
      };
      decodedShooldata.push(schoolData);
    }
    decodedShooldata &&
      decodedShooldata?.map((row: any) => {
        filteredData.push({
          id: row.tokenId,
          schoolName: row.schoolName,
          longitude: row.longitude,
          latitude: row.latitude,
          schoolType: row.schoolType,
          country: row.country,
          connectivity: row.connectivity,
          coverage_availabitlity: row.coverage_availabitlity,
          electricity_availabilty: row.electricity_availabitlity,
          mintedStatus: 'MINTED',
          mintedAt: row.mintedAt
        });
      });
    setTableData(filteredData);
  };

  let filteredData: any = [];
  useEffect(() => {
    if (paginatedData) decodeSchooldata(paginatedData);
  }, [data, paginatedData]);

  const sortedData = tableData?.slice().sort((a:any, b:any) => {
    const isAsc = order === 'asc';
    if(orderBy === 'longitude'){
    return (parseFloat(a[orderBy]) < parseFloat(b[orderBy]) ? -1 : 1) * (isAsc ? 1 : -1);
    }
    return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
  });

  return (
    <DashboardLayout>
      <h2>Minted School</h2>
      {fetching && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
      {!fetching && (
        <>
        <Card style={{marginTop: '20px'}}>
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
          <TablePaginationCustom
            count={data?.schoolTokenUris.length - 1 || 0}
            setPage={setPage}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
        </>
      )}
    </DashboardLayout>
  );
};

export default MintedSchools;

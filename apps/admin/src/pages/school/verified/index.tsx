"use client"
import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
import { TableEmptyRows, TableHeadUsers, TableNoData, TablePaginationCustom, TableSelectedAction, useTable } from "@components/table";
import { useSchoolGet } from "@hooks/school/useSchool";
// import { useAdministrationContext } from "@contexts/administration";
// import useFetchUsers from "@hooks/users/useFetchUsers";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Box, Button, Card, Tabs, Divider, TableContainer, Tooltip, IconButton, Table, TableBody } from "@mui/material";
import SchoolTableRow from "@sections/user/list/SchoolTableRow";
import { useEffect, useState } from "react";

const VerifiedSchool = () => {

    const TABLE_HEAD = [
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'location', label: 'Location', align: 'left' },
        { id: 'latitide', label: 'Latitude', align: 'left' },
        { id: 'longitude', label: 'Longitude', align: 'left' },
        { id: 'connectivity', label: 'Connectivity', align: 'left' },
        { id: 'coverage', label: 'Coverage', align: 'left' },
      ];

      const {dense, page, order, orderBy, rowsPerPage, onSort, onChangeDense, onChangePage, onChangeRowsPerPage,
      } = useTable();

    // const { filteredUsers } = useAdministrationContext();

    const [tableData, setTableData] = useState<any>([]);
    const {data} = useSchoolGet(page, rowsPerPage)


    // const { error } = useFetchUsers();

    let filteredData:any = []
    useEffect(() => {
      data?.rows.map((row:any) => {
        filteredData.push({
          name: row.name, 
          location: row.location,
          longitude: row.lon,
          latitude: row.lat,
          connectivity: row.connectivity_speed_status,
          coverage: row.connectivity_speed_status
        })
      })

      setTableData(filteredData);
    }, [data]);

    return ( 
        <DashboardLayout>
            <h2>Verified School List</h2>
          <Card>
          <Divider />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            {/* <TableSelectedAction
              dense={dense}
              // numSelected={selected?.length}
              rowCount={tableData?.length}
              // onSelectAllRows={(checked) =>
              //   onSelectAllRows(
              //     checked,
              //     tableData.map((row:any) => row.id)
              //   )
              // }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            /> */}

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadUsers
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                  // numSelected={selected?.length}
                  onSort={onSort}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row:any) => row.id)
                  //   )
                  // }
                />

                <TableBody>
                  {tableData &&
                    tableData.map((row:any) => (
                      <SchoolTableRow
                        key={row.id}
                        row={row}
                        // selected={selected?.includes(row.id)}
                        selected={true}
                      />
                    ))}
                  <TableNoData 
                  // isNotFound={!!error} 
                  isNotFound={false}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={data?.meta.total}
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
}
 
export default VerifiedSchool;
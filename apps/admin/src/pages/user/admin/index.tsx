"use client"
import Iconify from "@components/iconify";
import LoadingScreen from "@components/loading-screen/LoadingScreen";
import Scrollbar from "@components/scrollbar";
import { TableEmptyRows, TableHeadUsers, TableNoData, TablePaginationCustom, TableSelectedAction, useTable } from "@components/table";
import { useUserGet } from "@hooks/user/useUser";
// import { useAdministrationContext } from "@contexts/administration";
// import useFetchUsers from "@hooks/users/useFetchUsers";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Box, Button, Card, Tabs, Divider, TableContainer, Tooltip, IconButton, Table, TableBody, CircularProgress } from "@mui/material";
import UserListRow from "@sections/user/list/UsersList";
import { useEffect, useState } from "react";

const UserList = () => {

    const TABLE_HEAD = [
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'email', label: 'Email', align: 'left' },
        { id: 'wallet', label: 'Wallet', align: 'left' }
      ];

      const {dense, page, order, orderBy, rowsPerPage, onSort, onChangeDense, onChangePage, onChangeRowsPerPage,
      } = useTable();

    // const { filteredUsers } = useAdministrationContext();

    const [tableData, setTableData] = useState<any>([]);
    const {data, isFetching} = useUserGet(page, rowsPerPage, 'ADMIN')

    let filteredData:any = []
    useEffect(() => {
      !isFetching &&  data?.rows?.map((row:any) => {
        const buffer = row.walletAddress && Buffer.from(row.walletAddress.data)
        const walletString = buffer &&` 0x${buffer.toString('hex')}`
        filteredData.push({
          id: row.id,
          name: row.name,
          email: row.email,
          wallet: walletString || 'N/A'
        })
      })
      setTableData(filteredData);
    }, [data, isFetching]);

    return ( 

<DashboardLayout>
            <h2>Admin List</h2>
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
                      <UserListRow
                        key={row.id}
                        row={row}
                      />
                    ))}
                  {!isFetching ? <TableNoData
                  isNotFound={tableData.length === 0} /> : <CircularProgress color="inherit"/> }
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          {/* <TablePaginationCustom
            count={10}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          /> */}
        </Card>
        </DashboardLayout>
     );
}
 
export default UserList;
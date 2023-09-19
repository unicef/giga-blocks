"use client"
import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
import { TableEmptyRows, TableHeadUsers, TableNoData, TablePaginationCustom, TableSelectedAction, useTable } from "@components/table";
import { useAdministrationContext } from "@contexts/administration";
import useFetchUsers from "@hooks/users/useFetchUsers";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Box, Button, Card, Tabs, Divider, TableContainer, Tooltip, IconButton, Table, TableBody } from "@mui/material";
import SchoolTableRow from "@sections/user/list/SchoolTableRow";
import { useEffect, useState } from "react";

const VerifiedSchool = () => {

    const TABLE_HEAD = [
        { id: '' },
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'email', label: 'Email', align: 'left' },
        { id: 'roles', label: 'Role', align: 'left' },
        { id: '' },
      ];

      const {dense, page,order, orderBy, rowsPerPage, selected, onSelectAllRows, onSort, onChangeDense, onChangePage, onChangeRowsPerPage,
      } = useTable();


    const { filteredUsers } = useAdministrationContext();

    const [tableData, setTableData] = useState<any>([]);

    const { error } = useFetchUsers();


    useEffect(() => {
      setTableData([
        {
            id: "1e5eea80-8271-40e2-8b7f-6746444a6a2f",
            name: "John Doe",
            email: "john@mailinator.com",
            roles: 
                "ADMIN"
            ,
            isActive: true,
            isBlocked: false,
            isApproved: true,
            phone: "8778"
        }
    ]);
    }, [filteredUsers]);

    const handleOpenConfirm = () => {};

    return ( 
        <DashboardLayout>
          <Card>
          <Divider />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected?.length}
              rowCount={tableData?.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row:any) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadUsers
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                  numSelected={selected?.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row:any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData &&
                    tableData.map((row:any) => (
                      <SchoolTableRow
                        key={row.id}
                        row={row}
                        selected={selected?.includes(row.id)}
                      />
                    ))}
                  <TableNoData isNotFound={!!error} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={tableData?.length}
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
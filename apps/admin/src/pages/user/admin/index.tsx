"use client"
import Scrollbar from "@components/scrollbar";
import {  TableHeadUsers, TableNoData, useTable } from "@components/table";
import { useUserGet } from "@hooks/user/useUser";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Card, Divider, TableContainer, Table, TableBody, CircularProgress, TextField } from "@mui/material";
import UserListRow from "@sections/user/list/UsersList";
import { ChangeEvent, useEffect, useState } from "react";

interface FilteredDataType {
  id: string,
  name: string,
  email: string,
  wallet: string
}

const UserList = () => {

    const TABLE_HEAD = [
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'email', label: 'Email', align: 'left' },
        { id: 'wallet', label: 'Wallet', align: 'left' }
      ];
      const [name, setName] = useState<string>()

      const {dense, page, order, orderBy, rowsPerPage, onSort
      } = useTable();

    const [tableData, setTableData] = useState<any>([]);
    const {data, isFetching, refetch} = useUserGet(page, rowsPerPage, 'ADMIN', name)

    useEffect(() => {
      refetch()
    }, [name])

    let filteredData:FilteredDataType[] = []
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

    const sortedData = tableData.slice().sort((a:any, b:any) => {
      const isAsc = order === 'asc';
      return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
    });

    const handleSearchChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setName(e.target.value)
    }

    return ( 

      <DashboardLayout>
            <h2>Admin List</h2>
          <TextField id="outlined-basic" type='string' placeholder='Search admin' onChange={(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleSearchChange(e)}/>
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
                  {sortedData &&
                    sortedData?.map((row:any) => (
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
        </Card>
        </DashboardLayout>
     );
}
 
export default UserList;
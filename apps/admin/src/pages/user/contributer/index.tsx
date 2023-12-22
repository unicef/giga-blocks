"use client"
import Scrollbar from "@components/scrollbar";
import { TableHeadUsers, TableNoData, useTable } from "@components/table";
import { useUserGet } from "@hooks/user/useUser";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Card, Divider, TableContainer, Table, TableBody, TextField } from "@mui/material";
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
    const {data, isFetching, refetch} = useUserGet(page, rowsPerPage, 'CONTRIBUTOR', name)

    useEffect(() => {
      refetch()
    }, [name])

    let filteredData:FilteredDataType[] = []
    useEffect(() => {
      !isFetching && data && data?.rows?.map((row:any) => {
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

    const handleSearchChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setName(e.target.value)
    }

    return ( 

      <DashboardLayout>
          <h2>Contributor List</h2>
          <TextField id="outlined-basic" type='string' placeholder='Search contributor' onChange={(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleSearchChange(e)}/>
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
                    tableData?.map((row:any) => (
                      <UserListRow
                        key={row.id}
                        row={row}
                      />
                    ))}
                  <TableNoData
                  isNotFound={tableData.length === 0}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
        </DashboardLayout>
     );
}
 
export default UserList;
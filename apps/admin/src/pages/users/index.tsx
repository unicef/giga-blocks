import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  Box,
  TableContainer,
  Button,
} from '@mui/material';

// layouts
import DashboardLayout from '@layouts/dashboard';
// components
import Iconify from '@components/iconify';
import Scrollbar from '@components/scrollbar';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { AdministrationProvider, useAdministrationContext } from '@contexts/administration';
// import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadUsers,
  TableSelectedAction,
  TablePaginationCustom,
} from '@components/table';

// sections
import useArchiveUser from '@hooks/users/useArchiveUser';
import useApproveUser from '@hooks/users/useApproveUser';
import useUnarchiveUser from '@hooks/useUnarchiveUser';
import useFetchUsers from '@hooks/users/useFetchUsers';
import { IUserAccountGeneral } from 'src/@types/user';
import { debounce } from 'lodash';
import { ROLES } from 'src/config-global';
import { UserTableToolbar, UserTableRow } from 'src/sections/user/list';
import swal from 'sweetalert2';

// routes
import { PATH_USER } from 'src/routes/paths';
import useBlockUser from '@hooks/users/useBlockUser';
import useActiveUser from '@hooks/users/useActiveUser';

// @types
// ----------------------------------------------------------------------
enum StatusOptions {
  All = 'all',
  Approved = 'approved',
  Pending = 'pending',
}

enum RoleOptions {
  All = 'all',
  Admin = 'ADMIN',
  User = 'USER',
}

const STATUS_OPTIONS: StatusOptions[] = [
  StatusOptions.All,
  StatusOptions.Approved,
  StatusOptions.Pending,
];
const ROLE_OPTIONS: RoleOptions[] = [RoleOptions.All, RoleOptions.Admin, RoleOptions.User];

const TABLE_HEAD = [
  { id: '' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'roles', label: 'Role', align: 'left' },
  { id: 'is_active', label: 'Is Active', align: 'center' },
  { id: 'isBlocked', label: 'Is Blocked', align: 'left' },
  { id: 'isApproved', label: 'Is Approved', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    {/* <RoleBasedGuard hasContent roles={[ROLES.SUPERADMIN]}> */}
      <AdministrationProvider>{page}</AdministrationProvider>
    {/* </RoleBasedGuard> */}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

// This function creates a query for search and filter backend API
const queryBuilder = (role: string, status: string, name: string) => {
  let query: string = '';
  query += role === 'all' ? '' : `&role=${role}`;
  query += status === 'all' ? '' : `&approved=${status === 'approved'}`;
  query += name ? `&name=${name}` : '';
  return query;
};

export default function UserListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const { push } = useRouter();

  const { filteredUsers } = useAdministrationContext();

  const [tableData, setTableData] = useState<IUserAccountGeneral[]>([]);

  const [filterName, setFilterName] = useState<string>('');

  const [filterRole, setFilterRole] = useState<string>('all');

  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Note: Hooks for updating database values
  const { archiveUser } = useArchiveUser();
  const { approveUser } = useApproveUser();
  const { unarchiveUser } = useUnarchiveUser();
  const { blockUser } = useBlockUser();
  const { activeUser } = useActiveUser();
  // Note: This code is responsible for handling all the data filteration
  const query: string = queryBuilder(filterRole, filterStatus, filterName);

  const { error, fetchFilterLists } = useFetchUsers();

  // const dataInPage = filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const handleOpenConfirm = () => {};

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const debouncedFetchFilterLists = useCallback(
    debounce((searchquery: string) => {
      fetchFilterLists(searchquery);
    }, 300),
    []
  );

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = async (id: string) => {
    await archiveUser(id);
  };
  const handleUnarchiveUser = async (id: string) => {
    await unarchiveUser(id);
  };

  const handleIsApproved = async (id: string) => {
    try {
      await approveUser(id);
      fetchFilterLists(query);
    } catch (e) {
      console.error(`Error while approving user with id ${id} `);
    }
  };
  const handleIsBlocked = async (id: string) => {
    try {
      await blockUser(id);
      fetchFilterLists(query);
    } catch (e) {
      console.error(`Error while blocking user with id ${id} `);
    }
  };

  const handleEditRow = (id: string) => {
    push(PATH_USER.edit(id));
  };

  const handleIsActive = async (id: string) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'This user will be inactive',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await activeUser(id);
          fetchFilterLists(query);
          swal.fire('Done!', 'User active status changed', 'success');
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire('Cancelled', 'The user wasnt inactive', 'error');
        }
      });
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  useEffect(() => {
    setTableData([
      {
          id: "1e5eea80-8271-40e2-8b7f-6746444a6a2f",
          name: "John Dadfoe",
          email: "john@mailinator.com",
          roles: 
              "ADMIN"
          ,
          isActive: true,
          isBlocked: false,
          isApproved: true,
          phone: "8778"
      },
      {
        id: "3e5eea80-8271-40e2-8b7f-6746444a6a2f",
        name: "Johasdf Doasdfe",
        email: "joasdfhn@asdfamailinator.com",
        roles: 
            "User"
        ,
        isActive: true,
        isBlocked: false,
        isApproved: true,
        phone: "8778"
    }
  ]);
  }, [filteredUsers]);

  useEffect(() => {
    debouncedFetchFilterLists(query);
    return () => {
      debouncedFetchFilterLists.cancel();
    };
  }, [query, debouncedFetchFilterLists]);

  return (
    <>
      <Head>
        <title> User: List | LSO Partners</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs heading="User List" />
        <Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'background.neutral',
              px: 2,
            }}
          >
            <Tabs
              value={filterStatus}
              onChange={handleFilterStatus}
              sx={{
                px: 2,
                bgcolor: 'background.neutral',
                width: '90%',
              }}
            >
              {STATUS_OPTIONS.map((tab) => (
                <Tab key={tab} label={tab} value={tab} />
              ))}
            </Tabs>
            <Button variant="contained" size="small">
              Create user
            </Button>
          </Box>

          <Divider />
          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected?.length}
              rowCount={tableData?.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
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
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }} >
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
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData &&
                    tableData.map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={selected?.includes(row.id)}
                        // onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        handleUnarchiveUser={() => handleUnarchiveUser(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        handleIsBlocked={() => handleIsBlocked(row.id)}
                        handleIsApproved={() => handleIsApproved(row.id)}
                        handleIsActive={() => handleIsActive(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                  />
                  {/* Note: This section handles error */}
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
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

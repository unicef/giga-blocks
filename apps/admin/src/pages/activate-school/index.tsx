'use client';
import ActiveDialog from '@components/active-dialog';
import Scrollbar from '@components/scrollbar';
import { TableHeadUsers, TableNoData, useTable } from '@components/table';
import {
  useActivatePatchSchool,
  useActivateSchool,
  useDeactivatePatchSchool,
} from '@hooks/school/useSchool';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {
  Alert,
  Card,
  Divider,
  IconButton,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
const TABLE_HEAD = [
  { id: 'link', label: 'Link', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'startDate', label: 'Start Date', align: 'left' },
  { id: 'endDate', label: 'End Date', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
];

const ActivateSchool = () => {
  const { dense, order, orderBy, onSort } = useTable({
    defaultOrderBy: 'createdAt',
    defaultOrder: 'desc',
  });

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const { data, isFetching } = useActivateSchool();
  const { mutate: activateSchool, isLoading: activating } = useActivatePatchSchool();
  const { mutate: deactivateSchool, isLoading: deactivating } = useDeactivatePatchSchool();
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const tableData = Array.isArray(data) ? data : [];
  const BASE_URL = process.env.NEXT_PUBLIC_WEB_NAME || '';

  const handleCopy = async (id: any, textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedUrl(id);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleStatusToggle = (school: any) => {
    const newStatus = school.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const updateFn = newStatus === 'ACTIVE' ? activateSchool : deactivateSchool;

    updateFn(
      { id: school.id },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: `Event link  ${
              newStatus === 'ACTIVE' ? 'Activated' : 'Deactivated'
            } Successfully!`,
          });
          // refetch();
        },
        onError: (err: any) => {
          setSnackbar({
            open: true,
            message: `${err?.response?.data?.message || 'Action failed! Please try again.'}  `,
          });
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Manage Event Links</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <ActiveDialog />
        </div>
      </div>

      <Card sx={{ marginTop: 2 }}>
        <Divider />
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadUsers
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                onSort={onSort}
                showCheckBox={true}
                numSelected={selectedValues.length}
              />

              <TableBody>
                {tableData.length > 0 ? (
                  tableData.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell scope="row">
                        <a
                          target="_blank"
                          href={`${BASE_URL}/schools/list?linkActivation=${row.id}`}
                        >{`${BASE_URL}/schools/list?linkActivation=${row.id}`}</a>
                        {copiedUrl === row.id ? (
                          <span style={{ marginLeft: 8, fontSize: 12, color: 'green' }}>
                            Copied!
                          </span>
                        ) : (
                          <Tooltip title="Copy to clipboard">
                            <IconButton
                              onClick={() =>
                                handleCopy(
                                  row.id,
                                  `${BASE_URL}/schools/list?linkActivation=${row.id}`
                                )
                              }
                              size="small"
                              sx={{ marginLeft: 1 }}
                            >
                              <ContentCopyOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {new Date(row.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">
                        {new Date(row.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <Switch
                            checked={row.status === 'ACTIVE'}
                            onChange={() => handleStatusToggle(row)}
                            // disabled={activating || deactivating}
                            color="primary"
                          />
                          <p style={{ fontSize: '12px' }}>
                            {row.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                          </p>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableNoData isNotFound={true} isFetching={isFetching} />
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={900}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
};

export default ActivateSchool;

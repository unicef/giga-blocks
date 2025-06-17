import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Box } from '@mui/system';
import { ErrorIcon, SuccessIcon } from 'src/theme/overrides/CustomIcons';
function CsvDetailsTable({ schools }: { schools: any[] }) {
  const heading = ['School ID', 'Status'];
  const MintStatus = {
    NOTMINTED: 'NOTMINTED',
    MINTED: 'MINTED',
    ISMINTING: 'ISMINTING',
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ my: 4, height: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              {heading?.map((column: string, index: number) => (
                <TableCell key={index} sx={{ whiteSpace: 'nowrap' }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {schools?.map((school, index) => (
              <TableRow
                key={school.id}
                sx={{ backgroundColor: index % 2 === 1 ? '#f5f5f5' : '#fff' }}
              >
                <TableCell>{school?.giga_school_id}</TableCell>
                <TableCell style={{ color: '#00ff00', fontWeight: 700 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {school?.minted === MintStatus.MINTED ? (
                      <SuccessIcon />
                    ) : school?.minted === MintStatus.ISMINTING ? (
                      <CircularProgress size={18} color="success" />
                    ) : (
                      <ErrorIcon />
                    )}{' '}
                    {school?.minted}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </>
  );
}

export default CsvDetailsTable;

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import { useUploadContext } from '@contexts/uploadContext';
type ValidationResult = {
  alreadyMinted: string[];
  invalidSchools: string[];
  inProgressSchools: string[];
};

const SpreadSheetTable = ({ invalidate }: { invalidate?: ValidationResult | null }) => {
  const { sheetNames, setSelectedSheetName, tableDatas: rows } = useUploadContext();
  const handleSelectedSheetName = (el: string) => {
    setSelectedSheetName(el);
  };
  const excludedSchools = new Set([
    ...(invalidate?.alreadyMinted || []),
    ...(invalidate?.invalidSchools || []),
    ...(invalidate?.inProgressSchools || []),
  ]);

  const filteredRows = rows.filter((row: string[]) => {
    return !excludedSchools.has(row[0]);
  });

  return (
    <>
      {sheetNames.length > 1 &&
        sheetNames?.map((el, index) => (
          <Button
            variant="outlined"
            sx={{ mx: 1, my: 0.5 }}
            key={index}
            onClick={() => handleSelectedSheetName(el)}
          >
            {el}
          </Button>
        ))}
      <TableContainer component={Paper} sx={{ my: 4, height: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              {rows[0]?.map((column: string, index: number) => (
                <TableCell
                  key={index}
                  sx={{
                    position: 'sticky',
                    top: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={rows[0]?.length} sx={{ textAlign: 'center' }}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}
            {filteredRows?.slice(1)?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{ backgroundColor: rowIndex % 2 === 1 ? '#f5f5f5' : '#fff' }}
              >
                {row?.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </>
  );
};

export default SpreadSheetTable;

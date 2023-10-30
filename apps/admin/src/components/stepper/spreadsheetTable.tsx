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
} from '@mui/material';
import { useUploadContext } from '@contexts/uploadContext';

const SpreadSheetTable = () => {
  const { sheetNames, setSelectedSheetName, tableDatas: rows } = useUploadContext();
  const handleSelectedSheetName = (el: string) => {
    setSelectedSheetName(el);
  };

  return (
    <>
      {sheetNames.length > 1 &&
        sheetNames.map((el, index) => (
          <Button
            variant="outlined"
            sx={{ mx: 1, my: 0.5 }}
            key={index}
            onClick={() => handleSelectedSheetName(el)}
          >
            {el}
          </Button>
        ))}
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {rows[0]?.map((column: string, index: number) => (
                <TableCell key={index} sx={{ whiteSpace: 'nowrap' }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(1).map((row, rowIndex) => (
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

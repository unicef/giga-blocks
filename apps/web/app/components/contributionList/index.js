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

const ContributionList = () => {
  return (
    <>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#222222' }}>
              <TableCell sx={{ whiteSpace: 'nowrap', color: '#fff' }}>
                {'School Name'}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap', color: '#fff' }}>
                {'Contributor'}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap', color: '#fff' }}>
                {'What Has Been Contributed'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{'School A'}</TableCell>
              <TableCell>{'Contributor X'}</TableCell>
              <TableCell>{'Connectivity Status'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </>
  );
};

export default ContributionList;

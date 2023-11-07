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
import { useContributeList } from '../../hooks/useContributionList';
import { Column } from '@carbon/react';

const SpreadSheetTable = () => {
  const { data: contributions, isLoading } = useContributeList();

  return (
    <>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: '#2c2b33' }}>
              <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
                {'School Name'}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
                {'Contributor'}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
                {'What has been contributed'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contributions?.length > 0 ? (
              contributions.map((contribution) => (
                <TableRow
                  key={contribution.id}
                  sx={{
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <TableCell>{contribution.schoolName}</TableCell>
                  <TableCell>{contribution.contributorName}</TableCell>
                  <TableCell>{contribution.contributionDescription}</TableCell>
                </TableRow>
              ))
            ) : (
              <Column sm={4} md={8} lg={16}>
                <p
                  style={{
                    marginTop: '15px',
                  }}
                >
                  {' '}
                  No contributions yet.
                </p>
              </Column>
            )}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </>
  );
};

export default SpreadSheetTable;

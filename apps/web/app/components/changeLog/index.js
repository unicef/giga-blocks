import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@carbon/react';
import { useContributeDetails } from '../../hooks/useContributionList';

const ChangeLog = ({ schoolid }) => {
  const { data } = useContributeDetails(schoolid);
  return (
    <TableContainer sx={{ my: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                whiteSpace: 'nowrap',
                color: 'white',
              }}
              style={{ background: '#2c2b33', color: '#ffff' }}
            >
              {'Field Type'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Change'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Contributor'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Date of change'}
            </TableCell>
            <TableCell
              style={{ background: '#2c2b33', color: '#ffff' }}
              sx={{ whiteSpace: 'nowrap', color: 'white' }}
            >
              {'Data Status'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.rows?.length === 0 || !data ? (
            <TableRow>
              <TableCell colSpan={3}>No contribution made yet.</TableCell>
            </TableRow>
          ) : (
            data?.rows?.map((contribution) => {
              const contributedData = JSON.parse(
                contribution?.contributed_data
              );
              return Object.entries(contributedData).map(
                ([fieldType, change]) => (
                  <TableRow key={contribution?.id + fieldType}>
                    <TableCell>{fieldType}</TableCell>
                    <TableCell>{change.toString()}</TableCell>
                    <TableCell>{contribution?.contributedUser?.name}</TableCell>
                    <TableCell>
                      {contribution?.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell>{contribution?.status}</TableCell>
                  </TableRow>
                )
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChangeLog;

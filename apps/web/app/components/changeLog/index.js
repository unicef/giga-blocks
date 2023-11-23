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
  console.log(data);
  const { contributeData, isLoading } = useContributeDetails(schoolid);
  console.log('contributeData', contributeData);
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
              {'School Name'}
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
              {'What has been contributed'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contributeData?.length === 0 || !contributeData ? (
            <TableRow>
              <TableCell colSpan={3}>No contribution made yet.</TableCell>
            </TableRow>
          ) : (
            contributeData?.map((contribution) => (
              <TableRow key={contribution?.contributeId}>
                <TableCell>{contribution?.school?.name}</TableCell>
                <TableCell>{contribution?.contributedUser?.name}</TableCell>
                <TableCell>{contribution.contributed_data}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChangeLog;

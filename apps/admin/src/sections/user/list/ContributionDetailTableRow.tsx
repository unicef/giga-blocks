import { useEffect, useState } from 'react';
// @mui
import {
  TableRow,
  TableCell
} from '@mui/material';


type Props = {
  row: any;
};

export default function ContributionDetailTableRow({
  row,
}: Props) {
  const {
    key,
    value
  } = row;

  console.log(value)

  return (
    <>
      <TableRow
        hover
        sx={{cursor: 'pointer'}}
      >

        <TableCell>
          {key}
        </TableCell>

        <TableCell align="left">
        {value.toString() === 'true' ? "Yes" : value.toString() === 'false' ? "No" : value.toString()}
        </TableCell>

      </TableRow>
    </>
  );
}

import { useEffect, useState } from 'react';
// @mui
import {
  Stack,
  Button,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Switch,
  Checkbox,
} from '@mui/material';

// components
import Iconify from '@components/iconify';
import MenuPopover from '@components/menu-popover';
import ConfirmDialog from '@components/confirm-dialog';
import { CustomAvatar } from '@components/custom-avatar';
import { useRouter } from 'next/router';
import { keys } from '@mui/system';

type Props = {
  row: any;
//   rowData: any;
};

export default function ContributionDetailTableRow({
  row,
}: Props) {
  const {
    key,
    value
  } = row;

  return (
    <>
      <TableRow
        hover
        // selected={selected}
        sx={{cursor: 'pointer'}}
      >

        <TableCell>
          {key}
        </TableCell>

        <TableCell align="left">
          {value.toString()}
        </TableCell>

      </TableRow>
    </>
  );
}

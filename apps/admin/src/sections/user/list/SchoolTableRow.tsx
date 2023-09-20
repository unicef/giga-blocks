import { useState } from 'react';
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
} from '@mui/material';

// components
import Iconify from '@components/iconify';
import MenuPopover from '@components/menu-popover';
import ConfirmDialog from '@components/confirm-dialog';
import { CustomAvatar } from '@components/custom-avatar';


type Props = {
  row: any;
  selected: boolean;
};

export default function UserTableRow({
  row,
  selected
}: Props) {
  const { 
  name,
  location,
  longitude,
  latitude,
  connectivity,
  coverage
  } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{location}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {longitude}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {latitude}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {connectivity}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {coverage}
        </TableCell>
      </TableRow>
    </>
  );
}

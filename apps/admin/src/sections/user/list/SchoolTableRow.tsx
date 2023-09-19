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
  const { name, email, roles } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="normal">
          <CustomAvatar alt={name} name={name} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {roles[0]}
        </TableCell>
      </TableRow>
    </>
  );
}

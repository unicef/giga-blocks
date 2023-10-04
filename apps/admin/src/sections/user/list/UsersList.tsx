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
  Checkbox,
} from '@mui/material';

// components
import Iconify from '@components/iconify';
import MenuPopover from '@components/menu-popover';
import ConfirmDialog from '@components/confirm-dialog';
import { CustomAvatar } from '@components/custom-avatar';
import { useRouter } from 'next/router';


type Props = {
  row: any;
};

export default function UserListRow({
  row,
}: Props) {
  const {
  id,
  name,
  email,
  wallet
  } = row;

  const {push} = useRouter()

  const handleEditRow = (row:string) => {
    push(`/user/${row}/edit`)
  }

  return (
    <>
      <TableRow hover 
      >

        <TableCell onClick={() => handleEditRow(id)}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" onClick={() => handleEditRow(id)}>
          {email}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }} onClick={() => handleEditRow(id)}>
          {wallet}
        </TableCell>

        
      </TableRow>
    </>
  );
}

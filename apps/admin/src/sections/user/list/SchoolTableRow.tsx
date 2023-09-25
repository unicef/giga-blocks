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
  selected: boolean;
};

export default function UserTableRow({
  row,
  selected
}: Props) {
  const {
  id,
  name,
  location,
  longitude,
  latitude,
  connectivity,
  coverage
  } = row;

  const {push} = useRouter()

  const handleEditRow = (row:string) => {
    push(`/school/${row}/edit`)
  }

  return (
    <>
      <TableRow hover selected={selected} onClick = {() => handleEditRow(id)}>

      <TableCell padding="checkbox"> 
        <Checkbox
          checked={selected}
        />
      </TableCell>

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

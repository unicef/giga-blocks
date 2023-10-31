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

type Props = {
  row: any;
  // selected: boolean;
  // onSelectRow: any;
  setSelectedValues: any;
  selectedValues: any;
  rowData: any;
  checkbox: boolean;
};

export default function ContributeTableRow({
  row,
}: Props) {
  const {
    id,
    name,
    school,
    date
  } = row;

  const { push } = useRouter();
  const schoolNft = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS

  const handleEditRow = (row: string) => {
    push(`/contribute/${row}`)
  };  

  return (
    <>
      <TableRow
        hover
        // selected={selected}
      >

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
          {name}
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
          {school}
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
          {date}
        </TableCell>

      </TableRow>
    </>
  );
}

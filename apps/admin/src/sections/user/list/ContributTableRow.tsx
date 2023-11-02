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
  checkbox,
  rowData,
}: Props) {
  const {
    id,
    name,
    school,
    contributedDataKey,
    contributedDataValue,
    date
  } = row;

  const { push } = useRouter();
  const schoolNft = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS

  const handleEditRow = (row: string) => {
    push(`/contribute/${row}`)
  };  

  const handleCheckboxChange = (event: any, row: any) => {}

  return (
    <>
      <TableRow
        hover
      >
      {checkbox &&(
        <TableCell padding="checkbox">
          <Checkbox
            // checked={selected}
            onChange={(e)=>handleCheckboxChange(e,rowData)}
          />
        </TableCell>
      )}

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
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
        {contributedDataKey} : {contributedDataValue.toString()}
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

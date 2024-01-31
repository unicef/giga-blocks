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
  setSelectedValues: any;
  selectedValues: any;
  rowData: any;
  checkbox: boolean;
};

export default function ValidateTableRow({
  row,
  checkbox,
  rowData,
  selectedValues,
  setSelectedValues
}: Props) {
  const {
    id,
    school,
    isApproved,
    contributedDataKey,
    contributedDataValue,
    date
  } = row;

  const { push } = useRouter();
  const schoolNft = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS

  const handleEditRow = (row: string) => {
    push(`/valid/${row}`)
  };  

  const handleCheckboxChange = (event: any, row: any) => {
    const isChecked = event.target.checked;
    if (isChecked) {
        setSelectedValues((prev: any) => [...prev, row]);
    } else {
      setSelectedValues((prevSelectedValues: any) =>
        prevSelectedValues.filter((value: any) => value.id !== row.id)
      );
    }
  }

  return (
    <>
      <TableRow
        hover
        sx={{cursor: 'pointer'}}
      >
      {checkbox &&(
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedValues.some((obj: any) => obj.id === id)}
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
              {school}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
          {isApproved}
        </TableCell>

        {/* <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
        {contributedDataKey} : {contributedDataValue.toString()}
        </TableCell> */}

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

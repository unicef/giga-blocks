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
  selectedValues:any;
  rowData: any;
};

export default function SchoolTableRow({
  row,
  // selected, 
  // onSelectRow,
  setSelectedValues,
  selectedValues,
  rowData
}: Props) {
  const {
  id,
  schoolName,
  country,
  longitude,
  latitude,
  mintedStatus
  } = row;

  const {push} = useRouter()

  const handleEditRow = (row:string) => {
    push(`/school/${row}`)
  }

  const handleCheckboxChange = (event:any, row:any) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      if(mintedStatus != "ISMINTING") {
      setSelectedValues((prev:any) => [
        ...prev,
        row,
      ]);
    }
    } else {
      setSelectedValues((prevSelectedValues:any) =>
        prevSelectedValues.filter((value:any) => value.id !== row.id)
      );
  }
  };


  return (
    <>
      <TableRow hover 
      // selected={selected}
      >

      <TableCell padding="checkbox"> 
        <Checkbox
          onChange={(e) => handleCheckboxChange(e, rowData)}
          // checked = {mintedStatus === "ISMINTING" ? false : undefined}
        />
      </TableCell>

        <TableCell onClick={() => handleEditRow(id)}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {schoolName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" onClick={() => handleEditRow(id)}>
          {country}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }} onClick={() => handleEditRow(id)}>
          {longitude}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }} onClick={() => handleEditRow(id)}>
          {latitude}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }} onClick={() => handleEditRow(id)}>
          {mintedStatus}
        </TableCell>

      </TableRow>
    </>
  );
}

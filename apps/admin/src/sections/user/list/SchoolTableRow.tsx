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

export default function SchoolTableRow({
  row,
  // selected,
  // onSelectRow,
  setSelectedValues,
  selectedValues,
  rowData,
  checkbox,
}: Props) {
  const {
    id,
    schoolName,
    country,
    longitude,
    latitude,
    mintedStatus,
    coverage_availabitlity,
    connectivity,
  } = row;

  const { push } = useRouter();
  const schoolNft = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS

  const handleEditRow = (row: string) => {
    if (mintedStatus == 'MINTED') push(`/school/minted/${row}`)
    else push(`/school/${row}`);
  };

  const handleCheckboxChange = (event: any, row: any) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (mintedStatus != 'ISMINTING') {
        setSelectedValues((prev: any) => [...prev, row]);
      }
    } else {
      setSelectedValues((prevSelectedValues: any) =>
        prevSelectedValues.filter((value: any) => value.id !== row.id)
      );
    }
  };

  // @ts-ignore
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    } else {
      return str;
    }
  };

  return (
    <>
      <TableRow
        hover
        // selected={selected}
      >
        {checkbox && (
          <TableCell padding="checkbox">
            <Checkbox
              onChange={(e) => handleCheckboxChange(e, rowData)}
              checked={selectedValues.some((obj: any) => obj.id === id)}
            />
          </TableCell>
        )}

        <TableCell onClick={() => handleEditRow(id)}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {truncateString(schoolName, 25)}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" onClick={() => handleEditRow(id)}>
          {country}
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
          {longitude}
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
          {latitude}
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => handleEditRow(id)}
        >
          {mintedStatus =='NOTMINTED'&& 'Pending'}
          {mintedStatus =='ISMINTING'&& 'In Progress'}
          {mintedStatus =='MINTED'&& mintedStatus}
          {/* {mintedStatus} */}
        </TableCell>
        {mintedStatus =='MINTED' && 
        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
        >
          <a href ={`https://testnet.arbiscan.io/token/${schoolNft}?a=${id}`} target="_blank" rel="noreferrer">
          {id}
          </a>
        </TableCell>
}
      </TableRow>
    </>
  );
}

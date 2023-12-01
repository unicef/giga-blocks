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
import Tooltip from '@mui/material/Tooltip';

type Props = {
  row: any;
  // selected: boolean;
  // onSelectRow: any;
//   setSelectedValues: any;
//   selectedValues: any;
  rowData: any;
//   checkbox: boolean;
};

export default function NFTTableRow({
  row,
  // selected,
  // onSelectRow,
//   setSelectedValues,
//   selectedValues,
  rowData,
//   checkbox,
}: Props) {
  const {
    id,
    blockNumber,
    from,
    to,
    transactionHash,
    blockTimestamp,
    __typename,
    // connectivity,
  } = row;

  const { push } = useRouter();
  const schoolNft = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS

//   const handleEditRow = (row: string) => {
//     if (mintedStatus == 'MINTED') push(`/nft/${row}`)
//     else push(`/nft/${row}`);
//   };

//   const handleCheckboxChange = (event: any, row: any) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       if (mintedStatus != 'ISMINTING') {
//         setSelectedValues((prev: any) => [...prev, row]);
//       }
//     } else {
//       setSelectedValues((prevSelectedValues: any) =>
//         prevSelectedValues.filter((value: any) => value.id !== row.id)
//       );
//     }
//   };

  // @ts-ignore
  const truncateString = (str) => {
      return str?.substring(0, 3) + '...' + str?.substring(str.length, str.length - 3);
  };

  return (
    <>
      <TableRow
        hover
        // selected={selected}
      >
        {/* {checkbox && (
          <TableCell padding="checkbox">
            <Checkbox
              onChange={(e) => handleCheckboxChange(e, rowData)}
              checked={selectedValues.some((obj: any) => obj.id === id)}
            />
          </TableCell>
        )} */}

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {blockNumber}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Tooltip title={from}>
            <span>{truncateString(from)}</span>
            </Tooltip>
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}        
        >
          <Tooltip title={to}>
            <span>{truncateString(to)}</span>
            </Tooltip>
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}          
        >
            <Tooltip title={transactionHash}>
            <span><a href={`https://testnet.arbiscan.io/tx/${transactionHash}`} target='_blank'>{truncateString(transactionHash)}</a> </span>
            </Tooltip>
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}          
        >
          {blockTimestamp}
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}          
        >
          {__typename}
        </TableCell>
        
      </TableRow>
    </>
  );
}

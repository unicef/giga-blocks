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
  rowData: any;
};

export default function NFTTableRow({
  row,
  rowData,
}: Props) {
  const {
    id,
    blockNumber,
    from,
    to,
    transactionHash,
    blockTimestamp,
    __typename,
  } = row;

  const { push } = useRouter();
  const schoolNft = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS


  // @ts-ignore
  const truncateString = (str) => {
      return str?.substring(0, 3) + '...' + str?.substring(str.length, str.length - 3);
  };

  return (
    <>
      <TableRow
         hover> 

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
            <span><a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target='_blank'>{truncateString(transactionHash)}</a> </span>
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
          {from === "0x0000000000000000000000000000000000000000" ? "Mint" : "Transfer"}
        </TableCell>
        
      </TableRow>
    </>
  );
}

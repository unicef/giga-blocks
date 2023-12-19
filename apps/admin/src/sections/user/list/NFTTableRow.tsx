// @mui
import {
  Stack,
  TableRow,
  TableCell,
  Typography
} from '@mui/material';

// components
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';

type Props = {
  row: any;
};

export default function NFTTableRow({
  row
}: Props) {
  const {
    blockNumber,
    from,
    to,
    transactionHash,
    blockTimestamp,
  } = row;

  // @ts-ignore
  const truncateString = (str) => {
      return str?.substring(0, 3) + '...' + str?.substring(str.length, str.length - 3);
  };

  return (
    <>
      <TableRow
         hover
         sx={{cursor: 'pointer'}}
         > 

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

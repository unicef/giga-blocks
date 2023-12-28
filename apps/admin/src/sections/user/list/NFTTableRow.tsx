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

  const date = new Date(blockTimestamp*1000)

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Format the date as a string
  var formattedDate = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day} ${hours}:${minutes}:${seconds}`;

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
          {formattedDate}
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

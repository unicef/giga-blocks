// @mui
import {
  Stack,
  TableRow,
  TableCell,
  Typography,
  Checkbox,
} from '@mui/material';
import { TESTNET_CHAINS,DEFAULT_CHAIN_ID } from '@components/web3/chains';

// components
import { useRouter } from 'next/router';

type Props = {
  row: any;
  setSelectedValues: any;
  selectedValues: any;
  rowData: any;
  checkbox: boolean;
};

export default function SchoolTableRow({
  row,
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
    mintedAt
  } = row;

  const { push } = useRouter();
  const schoolNft = process.env.NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS;
  const explorer = TESTNET_CHAINS[DEFAULT_CHAIN_ID]?.blockExplorerUrls[0]

  const handleEditRow = (row: string) => {
    if (mintedStatus == 'MINTED') push(`/nft/${row}`)
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
    if (str?.length > maxLength) {
      return str?.substring(0, maxLength - 3) + '...';
    } else {
      return str;
    }
  };

  const date = new Date(mintedAt*1000)

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Format the date as a string
  var formattedDate = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day} ${hours}:${minutes}:${seconds}`;

  return (
    <>
      <TableRow
        hover
        // selected={selected}
        sx={{cursor: 'pointer'}}
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
          {latitude}
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
          {mintedStatus =='NOTMINTED'&& 'Pending'}
          {mintedStatus =='ISMINTING'&& 'In Progress'}
          {mintedStatus =='MINTED'&& mintedStatus}
        </TableCell>
        {mintedStatus =='MINTED' && 
        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize' }}
        >
          <a href ={`${explorer}/token/${schoolNft}?a=${id}`} target="_blank" rel="noreferrer">
          {id}
          </a>
        </TableCell>
        }
        {mintedStatus =='MINTED' && 
        <TableCell
        align="left"
        sx={{ textTransform: 'capitalize' }}
        onClick={() => handleEditRow(id)}
        >
        {formattedDate}
        </TableCell>
        }
      </TableRow>
    </>
  );
}

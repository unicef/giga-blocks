// @mui
import { TableRow, TableCell, CircularProgress } from '@mui/material';
//
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
  isFetching?: boolean
};

export default function TableNoData({ isNotFound, isFetching }: Props) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          {!isFetching ? <EmptyContent
            title="No Data"
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          /> : 
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
          <CircularProgress color="inherit"/>
          </div>
          }
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}

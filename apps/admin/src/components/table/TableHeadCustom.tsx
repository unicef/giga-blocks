// @mui
import { Theme } from '@mui/material/styles';
import {
  Box,
  SxProps,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material';

import { getCurrentUser } from '@utils/sessionManager';
import { truncateText } from '@utils/index';
import { ROLES } from '../../config-global';

// -------------------------- --------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

type Props = {
  order?: 'asc' | 'desc';
  orderBy?: string;
  showCheckBox: boolean;
  disableCheckBox: boolean;
  headLabel: any;
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  sx?: SxProps<Theme>;
};

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  showCheckBox,
  disableCheckBox = false,
  onSort,
  onSelectAllRows,
  sx,
}: Props) {
  const user = getCurrentUser();
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.length > 0 && user?.roles.includes(ROLES.SUPERADMIN) && (
          <TableCell>Actions</TableCell>
        )}

        {showCheckBox && onSelectAllRows && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              disabled={disableCheckBox}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSelectAllRows(event.target.checked)
              }
            />
          </TableCell>
        )}

        {headLabel.length > 0 &&
          headLabel.map((headCell, index) => (
            <TableCell
              key={index}
              title={headCell.label}
              align="center"
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ width: headCell.width, minWidth: headCell.minWidth, whiteSpace: 'nowrap' }}
            >
              {onSort ? (
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => onSort(headCell.id)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {truncateText(headCell.label)}

                  {orderBy === headCell.id && (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  )}
                </TableSortLabel>
              ) : (
                truncateText(headCell.label)
              )}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

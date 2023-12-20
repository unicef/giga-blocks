import { useState } from 'react';
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
} from '@mui/material';

// components
import Iconify from '@components/iconify';
import MenuPopover from '@components/menu-popover';
import ConfirmDialog from '@components/confirm-dialog';
import { CustomAvatar } from '@components/custom-avatar';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  handleUnarchiveUser: VoidFunction;
  handleIsApproved: VoidFunction;
  handleIsBlocked: VoidFunction;
  handleIsActive: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  handleUnarchiveUser,
  onDeleteRow,
  handleIsApproved,
  handleIsBlocked,
  handleIsActive,
}: Props) {
  const { name, email, roles, isActive, isApproved, isBlocked } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const color = isActive ? 'error.main' : 'success.main';

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected} sx={{cursor: 'pointer'}}>
        <TableCell padding="normal" >
          <CustomAvatar alt={name} name={name} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {roles[0]}
        </TableCell>

        <TableCell align="center">
          <Iconify
            icon={isActive ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              cursor: 'pointer',
              height: 20,
              color: 'success.main',
              ...(!isActive && { color: 'error.main' }),
            }}
            onClick={handleIsActive}
          />
        </TableCell>

        <TableCell align="left">
          {roles[0] !== 'ADMIN' && <Switch checked={isBlocked} onChange={handleIsBlocked} />}
        </TableCell>

        <TableCell align="left">
          {roles[0] !== 'ADMIN' && <Switch checked={isApproved} onChange={handleIsApproved} />}
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {roles[0] !== 'ADMIN' &&
          (isActive ? (
            <MenuItem
              onClick={() => {
                handleOpenConfirm();
                handleClosePopover();
              }}
              sx={{ color }}
            >
              <Iconify icon="eva:trash-2-outline" />
              Archive
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                handleUnarchiveUser();
                handleClosePopover();
              }}
              sx={{ color }}
            >
              <Iconify icon="eva:trash-2-outline" />
              Unarchive
            </MenuItem>
          ))}

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Deactivate User"
        content="Are you sure want to deactivate user?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}
          >
            Deactivate
          </Button>
        }
      />
    </>
  );
}

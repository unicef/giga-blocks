// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import NextLink from 'next/link';

// components
import { CustomAvatar } from '@components/custom-avatar';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();

  return (
    <NextLink href="/user/account" color="inherit" style={{ textDecoration: 'none' }}>
      <StyledRoot>
        <CustomAvatar src={user?.photoURL} alt={user?.name} name={user?.name} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ color: '#212B36 !important' }} noWrap>
            Sushant
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            Admin
          </Typography>
        </Box>
      </StyledRoot>
    </NextLink>
  );
}

// @mui
import { Box, Link, Typography, Stack } from '@mui/material';

import NextLink from 'next/link';
import Iconify from '@components/iconify';

import LoginLayout from '@layouts/login';

// assets
import { PasswordIcon } from '../../../assets/icons';
import { PATH_AUTH } from '../../../routes/paths';

// ----------------------------------------------------------------------


export default function VerifyPending({ errorMessage } : {
  errorMessage: string
}) {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PasswordIcon sx={{ mb: 0, height: 60 }} />
        </Box>

        <Typography variant="h4" color="white" paragraph>
          Please reach out to Admin !
        </Typography>

        <Typography sx={{ color: 'white', mb: 5 }}>
          {errorMessage ||
            'Your registration request has been forwarded to LSO-Partners for review. Please reach out to LSO-Partners to receive approval for your account.'}
        </Typography>

        <Link
          component={NextLink}
          href={PATH_AUTH.login}
          color="inherit"
          variant="subtitle2"
          sx={{
            mx: 'auto',
            alignItems: 'center',
            display: 'inline-flex',
            color: 'white',
          }}
        >
          <Iconify icon="eva:chevron-left-fill" width={16} />
          Return to sign in
        </Link>
      </Stack>
    </LoginLayout>
  );
}

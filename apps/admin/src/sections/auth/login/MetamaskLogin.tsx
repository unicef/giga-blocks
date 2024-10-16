import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';

import Iconify from '@components/iconify';
import LoginLayout from '@layouts/login/LoginLayout';
import AuthWeb3LoginForm from './AuthWeb3LoginForm';

import { PATH_AUTH } from '../../../routes/paths';

export default function MetamaskLogin() {
  return (
    <LoginLayout>
      <Typography variant="h4" color="white" marginBottom={4}>
        Login using metamask
      </Typography>
      <AuthWeb3LoginForm />
      <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          marginTop: '1rem',
          alignItems: 'center',
          display: 'inline-flex',
          color: 'white',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in options
      </Link>
    </LoginLayout>
  );
}

'use client';
import { Stack, Typography } from '@mui/material';
import LoginLayout from '@layouts/login';
import AuthLoginForm from './AuthLoginForm';
import Web2Login from './web2Login';

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={5}>
        <div>
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Typography variant="h4" color="white">
              Web3 Login
            </Typography>
            <Typography fontSize={14} color="white">
              Connect your metamask
            </Typography>
          </Stack>
          <AuthLoginForm />
        </div>
        <Web2Login />
      </Stack>
    </LoginLayout>
  );
}

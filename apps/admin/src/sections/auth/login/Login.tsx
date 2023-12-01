'use client';
import { useRouter } from 'next/router';
import { Button, Stack, Typography } from '@mui/material';
import LoginLayout from '@layouts/login';

export default function Login() {
  const { push } = useRouter();
  return (
    <LoginLayout>
      <Stack spacing={5}>
        <Typography variant="h4" color="white">
          Sign in options
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={() => push('/auth/email-login')}>
            Sign in Using Email
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => push('/auth/metamask-login')}
          >
            Sign in Using Metamask
          </Button>
        </Stack>
      </Stack>
    </LoginLayout>
  );
}

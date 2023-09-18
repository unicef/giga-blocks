"use client"
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
// layouts
import LoginLayout from '@layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import { Card } from '@components/web3/Card';
import { useEffect, useState } from 'react'
import { hooks, metaMask } from '@hooks/web3/metamask'

export default function Login() {


  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4" color="white">
          Giga School Admin
        </Typography>

        {/* <Stack direction="row" spacing={0.5}> */}
          {/* <Typography variant="body2" color="white">
            New user?
          </Typography>

          <Link href="/auth/register" style={{ textDecoration: 'none' }}>
            <Typography color="#f7931e" fontSize={14}>
              Register here
            </Typography>
          </Link> */}
        {/* </Stack>  */}
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}

"use client";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
// layouts
import LoginLayout from "@layouts/login";
//
import AuthLoginForm from "./AuthLoginForm";
import { metaMask } from "@hooks/web3/metamask";
import { useEffect } from "react";

export default function Login() {
 
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="h4" color="white">
          Web3 Login
        </Typography>
        <Typography fontSize={14} color="white">
          Connect your metamask
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

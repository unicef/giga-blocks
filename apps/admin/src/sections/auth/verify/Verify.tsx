import { useCallback } from 'react';
import { Box, Link, Typography, Stack } from '@mui/material';
import { useSnackbar } from '@components/snackbar';
import NextLink from 'next/link';
import Iconify from '@components/iconify';
import AuthVerifyCodeForm from '@sections/auth/verify/AuthVerifyCodeForm';
import LoginLayout from '@layouts/login';
import { useLoginContext } from '@contexts/auth';
import { CountdownTimer } from '@components/count-down';
import { OTP_DURATION } from '../../../config-global';
import { PATH_AUTH } from '../../../routes/paths';
import { EmailInboxIcon } from '../../../assets/icons';

export default function VerifyCodePage() {
  const currentEmail = localStorage.getItem('currentEmail');
  const { enqueueSnackbar } = useSnackbar();

  const { handleOtpRequest } = useLoginContext();

  const handleResendLink = useCallback(async () => {
    if (currentEmail) {
      try {
        const res = await handleOtpRequest(currentEmail);
        if (res?.success) enqueueSnackbar('Otp has been sent again, Please check your email!!');
      } catch (error) {
        console.error('Error occurred while resending code:', error);
      }
    }
  }, [currentEmail, handleOtpRequest, enqueueSnackbar]);

  const resetTimer = () => {
    localStorage.removeItem('countdownSeconds');
  };

  return (
    <LoginLayout>
      <Stack spacing={3} sx={{ mb: 5, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <EmailInboxIcon sx={{ mb: 0, height: 60 }} />
        </Box>

        <Typography variant="h4" color="white" paragraph>
          Please check your email!
        </Typography>

        <Typography sx={{ color: 'white', mb: 5 }}>
          We have emailed a 6-digit confirmation code to {currentEmail}, please enter the code in
          below box to verify your email.
        </Typography>

        <AuthVerifyCodeForm />
        <CountdownTimer minute={OTP_DURATION} handleResendLink={handleResendLink} />

        <Link
          component={NextLink}
          href={PATH_AUTH.email_login}
          color="inherit"
          variant="subtitle2"
          sx={{
            mx: 'auto',
            alignItems: 'center',
            display: 'inline-flex',
            color: 'white',
          }}
          onClick={resetTimer}
        >
          <Iconify icon="eva:chevron-left-fill" width={16} />
          Return to sign in
        </Link>
      </Stack>
    </LoginLayout>
  );
}

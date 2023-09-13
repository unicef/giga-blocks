import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
// components
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from '@components/snackbar';
import { APP_NAME } from '../../../config-global';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useLoginContext } from '../../../contexts/auth';

// ----------------------------------------------------------------------

type LoginFormValues = {
  email: string;
};

export default function AuthLoginForm() {
  const { isDebug } = useAuthContext();
  const { handleOtpRequest } = useLoginContext();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: isDebug
      ? Yup.string()
      : Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const defaultValues: LoginFormValues = {
    email: '',
  };

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async ({ email }: LoginFormValues) => {
    try {
      if (isDebug && email.indexOf('@') < 0) {
        email = `${email}@mailinator.com`;
      }
      const otpSent = await handleOtpRequest(email);
      if (otpSent) {
        push('/auth/verify');
      }
      enqueueSnackbar(otpSent.msg);
    } catch (error) {
      console.error(error);
      reset();
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  const onEmailSubmitError = (error: any) => {
    console.error(error);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onEmailSubmitError)}>
      {/* <Stack spacing={3} sx={{ mb: 2 }}>
        {!!errors.email?.message && <Alert severity="error">{errors.email.message}</Alert>}
        <RHFTextField name="email" label="Enter registered email *" />
      </Stack> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login with metamask
      </LoadingButton>
    </FormProvider>
  );
}

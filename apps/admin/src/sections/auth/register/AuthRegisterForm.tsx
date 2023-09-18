import { useEffect } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

// components
import FormProvider, { RHFTextField } from '@components/hook-form';
import { useRouter } from 'next/router';
import useUserSignup from '@hooks/useUserSignup';
import { BACKEND_URL } from 'src/config-global';

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  email: string;
  afterSubmit?: string;
};

export default function AuthRegisterForm() {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'Name must contain only characters')
      .required('Full name required'),
    email: Yup.string()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required('Email is required')
      .email('Email must be a valid email address'),
  });

  const defaultValues = {
    name: '',
    email: '',
  };

  const API_URL = `${BACKEND_URL}/auth/register`;
  const { loading, successMsg, error, registerUser } = useUserSignup();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    registerUser({ API_URL, payload: data });
  };

  useEffect(() => {
    if (successMsg) {
      enqueueSnackbar('User Registration Complete! Pending Approval from Admin');
      setTimeout(() => {
        push('/auth/verify-pending');
      }, 500);
    }
  }, [successMsg, enqueueSnackbar, push]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Full Name *" />
        </Stack>
        <RHFTextField name="email" label="Email Address *" />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          disabled={loading}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

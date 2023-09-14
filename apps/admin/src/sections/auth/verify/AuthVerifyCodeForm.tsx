import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { saveKey } from '@utils/sessionManager';

import FormProvider, { RHFCodes } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';

import { useLoginContext } from '@contexts/auth';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

export default function AuthVerifyCodeForm() {
  const { handleOtpVerification } = useLoginContext();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const otp = Object.values(data).join('');
      const isOtpValid = await handleOtpVerification({ otp: otp?.trim() });

      if (isOtpValid) {
        enqueueSnackbar('Your code has been verified');
        localStorage.removeItem('countdownSeconds');
        saveKey(isOtpValid.access_token);
        router.reload();
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      if (error.statusCode === 401) {
        router.push(`/auth/verify-pending?errorMessage=${error?.message}`);
      }
      setTimeout(() => {
        reset();
      }, 1000);
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2, color: '#f7931e !important' }}>
            Code is required
          </FormHelperText>
        )}

        <LoadingButton
          fullWidth
          size="large"
          color="inherit"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Verify
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

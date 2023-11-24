import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack } from '@mui/material';
// auth
// components
import { useAuthContext } from 'src/auth/useAuthContext';
import FormProvider from '../../../components/hook-form';
import Card from '@components/web3/Card';
import { useEffect, useState } from 'react';
import { hooks, metaMask } from '@hooks/web3/metamask';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

type LoginFormValues = {
  email: string;
};

export default function AuthLoginForm() {
  const { isDebug } = useAuthContext();
  // const { handleOtpRequest } = useLoginContext();
  // const { push } = useRouter();
  // const { enqueueSnackbar } = useSnackbar();

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

  // const {
  //   reset,
  //   setError,
  //   handleSubmit,
  //   formState: { isSubmitting, errors },
  // } = methods;

  // const onSubmit = async ({ email }: LoginFormValues) => {
  //   try {
  //     if (isDebug && email.indexOf('@') < 0) {
  //       email = `${email}@mailinator.com`;
  //     }
  //     const otpSent = await handleOtpRequest(email);
  //     if (otpSent) {
  //       push('/auth/verify');
  //     }
  //     enqueueSnackbar(otpSent.msg);
  //   } catch (error) {
  //     console.error(error);
  //     reset();
  //     setError('email', {
  //       type: 'manual',
  //       message: error.message,
  //     });
  //   }
  // };

  const onEmailSubmitError = (error: any) => {
    console.error(error);
  };

  // Web-3 react
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState(undefined);

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  return (
    <FormProvider
      methods={methods}
      // onSubmit={handleSubmit(onSubmit, onEmailSubmitError)}
    >
      {/* <Stack spacing={3} sx={{ mb: 2 }}>
        {!!errors.email?.message && <Alert severity="error">{errors.email.message}</Alert>}
        <RHFTextField name="email" label="Enter registered email *" />
      </Stack> */}

      <Stack direction="row" spacing={0.5}>
        <Card
          connector={metaMask}
          activeChainId={chainId}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
          setError={setError}
          accounts={accounts}
          provider={provider}
          ENSNames={ENSNames}
        />
      </Stack>

      {/* <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login with metamask
      </LoadingButton> */}
    </FormProvider>
  );
}

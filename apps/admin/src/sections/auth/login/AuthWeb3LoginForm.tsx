import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack } from '@mui/material';
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
    <FormProvider methods={methods}>
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
    </FormProvider>
  );
}

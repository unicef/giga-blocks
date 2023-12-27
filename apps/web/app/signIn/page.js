'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import {
  Button,
  InlineNotification,
  Column,
  Form,
  Grid,
  TextInput,
} from '@carbon/react';
import { Tile } from '@carbon/react';
import Link from 'next/link';
import './signIn.scss';
import { useForm, Controller } from 'react-hook-form';
import { useOtp } from '../hooks/useOtp';
import CarbonModal from '../components/modal/index';

import Web3Provider from '../components/web3/Provider';
import { metaMask } from '../components/web3/connectors/metamask';
import { useGetNonce, walletLogin } from '../hooks/walletLogin';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  saveAccessToken,
  saveCurrentUser,
  saveConnectors,
} from '../utils/sessionManager';
import { useAuthContext } from '../auth/useAuthContext';
import { metaMaskLogin } from '../utils/metaMaskUtils';

const SignIn = () => {
  const route = useRouter();
  const pathname = usePathname();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { initialize } = useAuthContext();
  const [walletAddress, setWalletAddress] = useState('');
  const loginMutation = walletLogin();
  const getNonceQuery = useGetNonce();
  const web3 = useWeb3React();
  const sendOtp = useOtp();
  const [email, setEmail] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [submitButtonText, setSubmitButtonText] =
    useState('Sign in with Email');
  const [notification, setNotification] = useState(null);

  const showEmailInput = () => {
    setShowEmailField(true);
    setSubmitButtonText('Submit');
  };

  useEffect(() => {
    if (web3) {
      setWalletAddress(web3.account);
    }
  }, [web3]);

  useEffect(() => {
    if (!web3.isActive) {
      void metaMask.connectEagerly();
    }
  }, []);

  const getSignature = async (nonce) => {
    try {
      const signer = web3.provider.getSigner();
      let signature = await signer.signMessage(nonce);
      signature = `${nonce}:${signature}`;
      return signature;
    } catch (err) {
      console.log({ err });
    }
  };

  const onSubmit = async (data,e) => {
    e.preventDefault();
    sendOtp
      .mutateAsync({ email: data.email })
      .then(() => {
        setOpenModal(true);
        setEmail(data.email);
      })
      .catch((error) => {
        setNotification({
          kind: 'error',
          title: 'User not found.',
        });
      });
  };
  const handleWalletLogin = async (data) => {
    try {
      await metaMaskLogin();
      const { nonce } = await getNonceQuery.mutateAsync();
      const sign = await getSignature(nonce);
      const address = await web3.provider.getSigner().getAddress();
      if (!sign) {
        setNotification({
          kind: 'error',
          title: 'User rejected signature.',
        });
        return;
      }
      const payload = {
        walletAddress: address,
        signature: sign,
      };
      loginMutation.mutateAsync(payload).then((res) => {
        if (res.message === 'Request failed with status code 404') {
          setNotification({
            kind: 'error',
            title: 'User not found.',
          });
          return;
        }
        if (res.message === 'Request failed with status code 500') {
          setNotification({
            kind: 'error',
            title: 'Nonce expired. Please login again.',
          });
          return;
        }
        saveCurrentUser(res.data);
        saveAccessToken(res.data.access_token);
        saveConnectors('metaMask');
        console.log('wallet logged in successfully');
        initialize();
        if (previousUrl) {
          route.push(previousUrl);
        } else {
          route.push('/contributeSchool');
        }
        setNotification({
          kind: 'success',
          title: 'Wallet login successful',
        });
      });
    } catch (error) {
      console.log('error', error);
      setNotification({
        kind: 'error',
        title: 'Error during wallet login',
      });
    }
  };

  useEffect(() => {
    setPreviousUrl(sessionStorage.getItem('previousUrl') || null);
    sessionStorage.removeItem('previousUrl');
  }, []);

  const onClose = () => {
    setOpenModal(false);
  };

  const onCloseNotification = () => {
    setNotification(null);
  };

  return (
    <>
      {notification && (
        <InlineNotification
          aria-label="closes notification"
          kind={notification.kind}
          onClose={onCloseNotification}
          title={notification.title}
          style={{
            position: 'fixed',
            top: '50px',
            right: '2px',
            width: '400px',
            zIndex: 1000,
          }}
        />
      )}
      <CarbonModal open={openModal} onClose={onClose} email={email} />
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>Sign In To Your Account</h1>
            <Form onSubmit={handleSubmit()}>
              {showEmailField && (
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      id="email"
                      style={{ marginBottom: '25px', height: '48px' }}
                      labelText="Email"
                      placeholder="Enter your email here"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              )}
              {errors.email && (
                <p style={{ color: 'red' }}>{errors.email.message}</p>
              )}
              {/* {showEmailField && (
                <Checkbox className="checkbox" labelText="Remember ID" />
              )} */}
              <br />
              <Button
                className="submit-btn"
                type="submit"
                style={{ marginRight: '14px', width: '100%' }}
                onClick={(e) => {
                  if (showEmailField) {
                    handleSubmit(onSubmit)(e);
                  } else {
                    showEmailInput();
                  }
                }}
              >
                {submitButtonText}
              </Button>
              <Button
                className="submit-btn"
                style={{
                  marginRight: '14px',
                  width: '100%',
                  background: 'transparent',
                  color: '#0f62fe',
                  border: '1px solid #0f62fe',
                }}
                onClick={handleWalletLogin}
              >
                Login With Metamask
              </Button>
            </Form>
          </Tile>
          <p style={{ marginLeft: '20px', color: '#000' }}>
            Dont have an account ?{' '}
            <Link className="link" href={'/signUp'}>
              {' '}
              Sign Up
            </Link>
          </p>
        </Column>
      </Grid>
    </>
  );
};

const WalletLogin = () => {
  return (
    <Web3Provider>
      <SignIn />
    </Web3Provider>
  );
};

export default WalletLogin;

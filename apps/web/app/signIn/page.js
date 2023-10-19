'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Button, Checkbox, Column, Form, Grid, TextInput } from '@carbon/react';
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
import { saveAccessToken, saveCurrentUser,saveConnectors } from '../utils/sessionManager';
import { useAuthContext } from '../auth/useAuthContext';

const SignIn = () => {
  const route = useRouter();
  const { handleSubmit, control } = useForm();
  const {initialize} = useAuthContext()
  const [walletAddress, setWalletAddress] = useState('');
  const loginMutation = walletLogin();
  const getNonceQuery = useGetNonce();
  const web3 = useWeb3React();
  const sendOtp = useOtp();
  const [email, setEmail] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (web3) {
      setWalletAddress(web3.account);
    }
  }, [web3]);

  useEffect(() => {
    if (!web3.isActive) {
      metaMask.connectEagerly();
    }
  }, [web3]);

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

  const onSubmit = async (data) => {
    sendOtp
      .mutateAsync({ email: data.email })
      .then(() => {
        setOpenModal(true);
        setEmail(data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleWalletLogin = async (data) => {
    try {
      const { nonce } = await getNonceQuery.mutateAsync();
      const sign = await getSignature(nonce);
      const payload = {
        walletAddress: walletAddress,
        signature: sign,
      };
      loginMutation.mutateAsync(payload).then((res)=>{
        saveCurrentUser(res.data)
        saveAccessToken(res.data.access_token)
        saveConnectors('metaMask')
        console.log('wallet logged in successfully');
        initialize()
        route.push('/dashboard');
      });
      
    } catch (error) {}
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <CarbonModal open={openModal} onClose={onClose} email={email} />
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>Sign In To Your Account</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Full Name is required' }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="email"
                    style={{ marginBottom: '25px', height: '48px' }}
                    // invalid={!!errors.fullname}
                    labelText="Full Name"
                    placeholder="Enter your fullname here"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
              <Checkbox className="checkbox" labelText="Remember ID" />
              <br />
              <Button
                className="submit-btn"
                type="submit"
                style={{ marginRight: '14px' }}
              >
                Submit
              </Button>
              <Button className="submit-btn" onClick={handleWalletLogin}>
                Login With Metamask
              </Button>
            </Form>
          </Tile>
          <p style={{ marginLeft: '20px' }}>
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

'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Column, Form, Grid, TextInput } from '@carbon/react';
import { Tile } from '@carbon/react';
import './walletRegister.scss';
import Link from 'next/link';
import Web3Provider from '../components/web3/Provider';
import { metaMask } from '../components/web3/connectors/metamask';

import { walletRegister, useGetNonce } from '../hooks/walletLogin';
import { useWeb3React } from '@web3-react/core';
import {saveAccessToken, saveCurrentUser} from '../utils/sessionManager'
import {useAuthContext} from '../auth/useAuthContext'

const WalletRegisterForm = () => {
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const { control, handleSubmit } = useForm();
  const registerMutation = walletRegister();
  const getNonceQuery = useGetNonce();
  const web3 = useWeb3React();
  const {initialize} = useAuthContext()

  useEffect(() => {
    if (web3) {
      setWalletAddress(web3.account);
    }
  }, [web3]);

  useEffect(()=>{
    if(!web3.isActive){
      metaMask.connectEagerly();
    }
  },[web3])

  const getSignature = async(nonce)=>{
    try{
      const signer = web3.provider.getSigner();
      let signature = await signer.signMessage(nonce);
      signature = `${nonce}:${signature}`
      return signature;
    }
    catch(err){
      console.log({err})
    }
  }

  const onSubmit = async (data) => {
    try {
      const {nonce} = await getNonceQuery.mutateAsync();
     const sign = await getSignature(nonce);
      const payload = {
        name: data.name,
        walletAddress: walletAddress,
        signature:sign
      };
      registerMutation.mutateAsync(payload).then((res)=>{
        saveCurrentUser(res.data);
        saveAccessToken(res.data.access_token);
        initialize();     
      })

      console.log('Wallet registered successfully!');
    } catch (error) {
      console.error('Error registering wallet:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>Create Your Account Using Metamask</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Full Name is required' }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    // id="name"
                    style={{ marginBottom: '25px', height: '48px' }}
                    // invalid={!!errors.fullname}
                    labelText="Full Name"
                    placeholder="Enter your fullname here"
                    onChange={(e) => {
                      field.onChange(e);
                      setName(e.target.value);
                    }}
                  />
                )}
              />
              <Controller
                name="walletAddress"
                control={control}
                rules={{
                  required: '',
                }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    // id="walletAddress"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="Wallet Address"
                    disabled
                    value={walletAddress}
                  />
                )}
              />
              <br />
              <Button className="submit-btn" type="submit">
                Submit
              </Button>
              <Checkbox
                className="checkbox"
                labelText="By creating an account, you agree to the Terms and conditions and our Privacy Policy"
              />
            </Form>
          </Tile>
          <p style={{ marginLeft: '20px' }}>
            Already have an account? <Link href="/signIn">Sign In</Link>
          </p>
        </Column>
      </Grid>
    </>
  );
};

const WalletRegister = () => {
  return (
    <Web3Provider>
      <WalletRegisterForm />
    </Web3Provider>
  );
};

export default WalletRegister;

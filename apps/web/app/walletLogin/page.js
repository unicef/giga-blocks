'use client';
import React from 'react';
import Navbar from '../components/navbar';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Column, Form, Grid, TextInput } from '@carbon/react';
import { Tile } from '@carbon/react';
import './walletRegister.scss';
import Link from 'next/link';
import { walletRegister, useGetNonce } from '../hooks/walletLogin';

const WalletRegister = () => {
  const { control, handleSubmit } = useForm();
  const registerMutation = walletRegister();
  const getNonceQuery = useGetNonce();

  const onSubmit = async (data) => {
    try {
      await getNonceQuery.mutateAsync();
      const payload = {
        name: data.name,
        walletAddress: data.walletAddress,
        nonce: getNonceQuery.data.nonce,
      };
      await registerMutation.mutateAsync(payload);
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
                    id="name"
                    style={{ marginBottom: '25px', height: '48px' }}
                    // invalid={!!errors.fullname}
                    labelText="Full Name"
                    placeholder="Enter your fullname here"
                    onChange={(e) => {
                      field.onChange(e);
                      setEmail(e.target.value);
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
                    id="walletAddress"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="Wallet Address"
                    disabled
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

export default WalletRegister;

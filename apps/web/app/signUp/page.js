'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Checkbox,
  Column,
  Form,
  Grid,
  TextInput,
  InlineNotification,
} from '@carbon/react';
import { Tile } from '@carbon/react';
import './signup.scss';
import Link from 'next/link';
import { useOtp } from '../hooks/useOtp';
import { useSignUp } from '../hooks/useSignUp';
import { useRouter } from 'next/navigation';
import { metaMask, hooks } from '../components/web3/connectors/metamask';
import CarbonModal from '../components/modal/index';
import { metaMaskLogin } from '../utils/metaMaskUtils';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const account = hooks.useAccount();
  const { handleSubmit, control } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [notification, setNotification] = useState(null);
  const signUp = useSignUp();
  const sendOtp = useOtp();

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        onCloseNotification();
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const onSubmit = async (data) => {
    signUp
      .mutateAsync(data)
      .then(() => {
        setNotification({
          kind: 'success',
          title: 'Registered successfully. OTP sent to email.',
        });
        sendOtp
          .mutateAsync({ email: data.email })
          .then(() => {
            setOpenModal(true);
            setEmail(data.email);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheck = () => {
    setCheckbox(!checkbox);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const handlePageChange = async () => {
    try {
      await metaMaskLogin();
      router.push('/walletRegister');
    } catch (error) {
      console.log(error);
    }
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
        <Column className="form" md={4} lg={16} sm={4}>
          <Tile className="signUp-tile">
            <h1>Create Your Account</h1>
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
                    }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="email"
                    style={{ marginBottom: '25px', height: '48px' }}
                    // invalid={!!errors.email}
                    labelText="Email"
                    placeholder="Enter your email here"
                  />
                )}
              />
              <Checkbox
                className="checkbox"
                id="checkbox"
                labelText="By creating an account, you agree to the Terms and conditions and our Privacy Policy"
                checked={checkbox}
                onChange={handleCheck}
              />
              <br />
              <Grid>
                <Column className="form" md={4} lg={16} sm={16}>
                  <Button
                    className="submit-btn"
                    type="submit"
                    disabled={!checkbox}
                  >
                    Submit
                  </Button>
                  <Button
                    className="submit-btn-transparent"
                    onClick={handlePageChange}
                  >
                    Sign Up Using Metamask
                  </Button>
                </Column>
              </Grid>
            </Form>
          </Tile>
          <p style={{ marginLeft: '20px', color: '#161616' }}>
            Already have an account? <Link href="/signIn">Sign In</Link>
          </p>
        </Column>
      </Grid>
    </>
  );
};

export default SignUp;

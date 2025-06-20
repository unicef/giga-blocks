'use client';
import React, { Suspense, useEffect, useState } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { metaMask } from '../components/web3/connectors/metamask';
import SignUpClient from './signUpClient';
import { metaMaskLogin } from '../utils/metaMaskUtils';
import { getAccessToken } from '../utils/sessionManager';

const SignUp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpClient />
    </Suspense>
  );
};

export default SignUp;

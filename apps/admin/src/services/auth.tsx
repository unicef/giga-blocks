import { AxiosResponse } from 'axios';
import client from '../utils/client';

type OtpRequestData = {};

type VerifyOtpData = {};

export const AuthService = {
  otpRequest(data: OtpRequestData): Promise<AxiosResponse> {
    return client.post('/auth/admin/send-otp', data);
  },
  verifyOtp(data: VerifyOtpData): Promise<AxiosResponse> {
    return client.post('/auth/login', data);
  },
};

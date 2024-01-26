import { OTP } from "../../constants/api";
import { useMutation } from "@tanstack/react-query";
import {apiGuest} from '../../utils/api'

export const useOtp = () => {
  const otpMutation = useMutation(async (payload) => {
    try {
      const otp = await apiGuest.post(OTP.REGISTER, payload);
      return otp;
    } catch (error) {
      throw error;
    }
  });
  return otpMutation;
};

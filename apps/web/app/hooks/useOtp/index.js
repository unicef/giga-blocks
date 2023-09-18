import { BASE_URL, OTP } from "../../constants/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export const useOtp = () => {
  const otpMutation = useMutation(async (payload) => {
    try {
      const otp = await api.post(OTP.REGISTER, payload);
      return otp;
    } catch (error) {
      throw error;
    }
  });
  return otpMutation;
};

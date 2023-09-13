import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import { AuthService } from '../services';

type LoginState = {
  otpSent: boolean;
  handleOtpRequest: (payload: string) => Promise<any>;
  handleOtpVerification: (payload: { otp: string }) => Promise<any>;
  setOtpSent: (otpSent: boolean) => void;
  email: string;
};

const initialState: LoginState = {
  otpSent: false,
  handleOtpRequest: () => Promise.resolve(),
  handleOtpVerification: () => Promise.resolve(),
  setOtpSent: () => {},
  email: '',
};

const LoginContext = createContext<LoginState>(initialState);

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LoginState>(initialState);
  const { addToken, addUser } = useAuthContext();

  const setOtpSent = useCallback((otpSent: boolean) => {
    if (otpSent) {
      setState((prev) => ({
        ...prev,
        otpSent,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        otpSent: !prev.otpSent,
      }));
    }
  }, []);

  const handleOtpRequest = useCallback(
    async (payload: string) => {
      const response = await AuthService.otpRequest({
        email: payload,
      });
      localStorage.setItem('currentEmail', payload);
      if (response?.data?.success === true) {
        setOtpSent(true);
        setState((prev) => ({
          ...prev,
          email: payload,
        }));
      }
      return response.data;
    },
    [setOtpSent]
  );

  const handleOtpVerification = useCallback(
    async (payload: { otp: string }) => {
      const response = await AuthService.verifyOtp({
        email: localStorage.getItem('currentEmail'),
        otp: payload.otp,
      });
      if (!response.data) throw new Error('Invalid OTP');
      addToken(response.data?.access_token);
      addUser(response.data);
      return response.data;
    },
    [addToken, addUser]
  );

  const contextValue: LoginState = useMemo(
    () => ({
      ...state,
      handleOtpRequest,
      handleOtpVerification,
      setOtpSent,
    }),
    [state, handleOtpRequest, handleOtpVerification, setOtpSent]
  );

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
}

export const useLoginContext = (): LoginState => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};

import { SIGNUP, LOGIN } from "../../constants/api";
import { useMutation } from "@tanstack/react-query";
import {apiGuest} from '../../utils/api'

export const useSignUp = () => {
  const signUpMutation = useMutation(async (payload) => {
    const signUp = await apiGuest.post(SIGNUP.REGISTER, payload);
    return signUp;
  });
  return signUpMutation;
};

export const useLogin = () => {
  const loginMutation = useMutation(async (payload) => {
    const login = await apiGuest.post(LOGIN.LOGIN, payload);
    return login;
  });
  return loginMutation;
}
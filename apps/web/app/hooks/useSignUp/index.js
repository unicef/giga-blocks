import { BASE_URL, SIGNUP, LOGIN } from "../../constants/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export const useSignUp = () => {
  const signUpMutation = useMutation(async (payload) => {
    const signUp = await api.post(SIGNUP.REGISTER, payload);
    return signUp;
  });
  return signUpMutation;
};

export const useLogin = () => {
  const loginMutation = useMutation(async (payload) => {
    const login = await api.post(LOGIN.LOGIN, payload);
    return login;
  });
  return loginMutation;
}
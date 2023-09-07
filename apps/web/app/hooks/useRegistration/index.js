import { BASE_URL, NEWSLETTER } from "../../constants/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export const useRegistration = () => {
  const registrationMutation = useMutation(async (payload) => {
    const register = await api.post(NEWSLETTER.REGISTER, payload);
    return register.data;
  });

  return registrationMutation;
};
